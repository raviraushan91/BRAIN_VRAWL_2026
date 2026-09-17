import { db } from "./firebase-config.js";

import {
    ref,
    set,
    update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const TOTAL_TIME = 60 * 60;

let questions = [];
let currentQuestion = 0;
let selectedYear = "";
let answers = {};
let timeLeft = TOTAL_TIME;

let timerInterval = null;
let syncInterval = null;

let quizStarted = false;
let quizSubmitted = false;

const student = JSON.parse(
    sessionStorage.getItem("currentStudent")
);

if (!student) {
    window.location.href = "index.html";
}


// ========================================
// ELEMENTS
// ========================================

const startScreen = document.getElementById("startScreen");
const startTestBtn = document.getElementById("startTestBtn");
const studentYear = document.getElementById("studentYear");
const yearError = document.getElementById("yearError");

const quizContainer = document.getElementById("quizContainer");

const timer = document.getElementById("timer");
const violationCount = document.getElementById("violationCount");

const questionNumber = document.getElementById("questionNumber");
const progressText = document.getElementById("progressText");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionGrid = document.getElementById("questionGrid");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");


// ========================================
// FIREBASE REF
// ========================================

function getStudentRef() {
    return ref(
        db,
        `students/${student.id}`
    );
}


// ========================================
// YEAR NAME
// ========================================

function getYearName(year) {

    const names = {
        "1": "1st Year",
        "2": "2nd Year",
        "3": "3rd Year",
        "4": "4th Year"
    };

    return names[year] || "Unknown";
}


// ========================================
// LOAD QUESTIONS
// ========================================

async function loadQuestions() {

    selectedYear = studentYear.value;

    if (!selectedYear) {
        yearError.innerText =
            "Please select your academic year.";
        return false;
    }

    yearError.innerText = "";

    let file;

    if (
        selectedYear === "1" ||
        selectedYear === "2"
    ) {
        file = "question1.js";
    }

    else if (
        selectedYear === "3" ||
        selectedYear === "4"
    ) {
        file = "question2.js";
    }

    else {
        yearError.innerText =
            "Invalid year selected.";
        return false;
    }

    try {

        window.questions = undefined;

        await import(
            `./${file}?v=${Date.now()}`
        );

        questions = window.questions;

        if (
            !Array.isArray(questions) ||
            questions.length === 0
        ) {
            throw new Error("Questions not found.");
        }

        console.log(
            "Loaded:",
            file,
            questions.length
        );

        return true;

    } catch (error) {

        console.error(
            "Question loading error:",
            error
        );

        yearError.innerText =
            `Unable to load ${file}.`;

        return false;
    }
}


// ========================================
// INITIALIZE STUDENT
// ========================================

async function initializeStudent() {

    await set(
        getStudentRef(),
        {
            id: student.id,
            name: student.name,

            year: getYearName(selectedYear),
            yearNumber: Number(selectedYear),

            attempted: 0,
            totalQuestions: questions.length,

            score: 0,

            timeRemaining: TOTAL_TIME,
            timeTaken: 0,

            violations: 0,

            status: "Active",

            startedAt: Date.now(),
            submittedAt: null,
            lastUpdated: Date.now()
        }
    );

    sessionStorage.setItem(
        "violations",
        "0"
    );

    sessionStorage.removeItem(
        "disqualified"
    );
}


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    const minutes = Math.floor(
        seconds / 60
    );

    const secs = seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );
}


// ========================================
// TIMER
// ========================================

function updateTimer() {

    timer.innerText =
        formatTime(timeLeft);
}


function startTimer() {

    clearInterval(timerInterval);

    timerInterval =
        setInterval(async () => {

            if (
                !quizStarted ||
                quizSubmitted
            ) {
                return;
            }

            timeLeft--;

            updateTimer();

            if (timeLeft <= 0) {

                timeLeft = 0;

                updateTimer();

                await submitQuiz(
                    "Time Over"
                );

                return;
            }

        }, 1000);
}


// ========================================
// ATTEMPTED
// ========================================

function getAttempted() {

    return Object.keys(
        answers
    ).length;
}


// ========================================
// SCORE
// ========================================

function calculateScore() {

    let score = 0;

    questions.forEach(
        (question, index) => {

            const studentAnswer =
                answers[index];

            if (
                studentAnswer === undefined
            ) {
                return;
            }

            if (
                studentAnswer ===
                question.answer
            ) {

                score += Number(
                    question.marks || 0
                );
            }
        }
    );

    return score;
}


// ========================================
// VIOLATIONS
// ========================================

function getViolations() {

    if (
        typeof window.getViolationCount ===
        "function"
    ) {

        return Number(
            window.getViolationCount()
        ) || 0;
    }

    return Number(
        sessionStorage.getItem(
            "violations"
        ) || 0
    );
}


// ========================================
// RENDER QUESTION
// ========================================

function renderQuestion() {

    if (!questions.length) {
        return;
    }

    const question =
        questions[currentQuestion];

    if (!question) {
        return;
    }


    // Question number

    questionNumber.innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    // Progress

    progressText.innerText =
        `${getAttempted()}/${questions.length} Attempted`;


    // Question

    questionText.innerText =
        question.question;


    // Options

    optionsContainer.innerHTML = "";


    question.options.forEach(
        option => {

            const label =
                document.createElement("label");

            label.className =
                "option";


            if (
                answers[currentQuestion] ===
                option
            ) {

                label.classList.add(
                    "selected"
                );
            }


            const input =
                document.createElement("input");

            input.type = "radio";

            input.name =
                "question";

            input.value =
                option;

            input.checked =
                answers[currentQuestion] ===
                option;


            input.addEventListener(
                "change",
                async () => {

                    answers[
                        currentQuestion
                    ] = option;

                    renderQuestion();

                    await syncStudent();
                }
            );


            const span =
                document.createElement("span");

            span.innerText =
                option;


            label.appendChild(input);
            label.appendChild(span);

            optionsContainer.appendChild(
                label
            );
        }
    );


    previousBtn.disabled =
        currentQuestion === 0;


    nextBtn.disabled =
        currentQuestion ===
        questions.length - 1;


    renderQuestionGrid();
}


// ========================================
// QUESTION GRID
// ========================================

function renderQuestionGrid() {

    questionGrid.innerHTML = "";


    questions.forEach(
        (_, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.innerText =
                index + 1;

            button.className =
                "question-grid-btn";


            if (
                index === currentQuestion
            ) {

                button.classList.add(
                    "current"
                );
            }


            if (
                answers[index] !==
                undefined
            ) {

                button.classList.add(
                    "answered"
                );
            }


            button.addEventListener(
                "click",
                () => {

                    if (
                        quizSubmitted
                    ) {
                        return;
                    }

                    currentQuestion =
                        index;

                    renderQuestion();
                }
            );


            questionGrid.appendChild(
                button
            );
        }
    );
}


// ========================================
// FIREBASE LIVE UPDATE
// ========================================

async function syncStudent() {

    if (
        !quizStarted ||
        quizSubmitted
    ) {
        return;
    }


    try {

        await update(
            getStudentRef(),
            {
                attempted:
                    getAttempted(),

                score:
                    calculateScore(),

                timeRemaining:
                    timeLeft,

                timeTaken:
                    TOTAL_TIME -
                    timeLeft,

                violations:
                    getViolations(),

                status:
                    "Active",

                lastUpdated:
                    Date.now()
            }
        );

    } catch (error) {

        console.error(
            "Sync error:",
            error
        );
    }
}


// ========================================
// LIVE SYNC
// ========================================

function startSync() {

    clearInterval(
        syncInterval
    );

    syncInterval =
        setInterval(
            syncStudent,
            5000
        );
}


// ========================================
// SUBMIT
// ========================================

async function submitQuiz(
    reason = "Normal Submit"
) {

    if (
        quizSubmitted
    ) {
        return;
    }


    quizSubmitted =
        true;

    quizStarted =
        false;


    clearInterval(
        timerInterval
    );

    clearInterval(
        syncInterval
    );


    const attempted =
        getAttempted();

    const score =
        calculateScore();

    const timeTaken =
        TOTAL_TIME -
        timeLeft;

    const violations =
        getViolations();


    const isDisqualified =
        reason
            .toLowerCase()
            .includes("disqualif") ||
        violations >= 3 ||
        sessionStorage.getItem(
            "disqualified"
        ) === "true";


    const finalStatus =
        isDisqualified
            ? "Disqualified"
            : "Submitted";


    try {

        await update(
            getStudentRef(),
            {

                attempted:
                    attempted,

                score:
                    score,

                timeRemaining:
                    timeLeft,

                timeTaken:
                    timeTaken,

                violations:
                    violations,

                status:
                    finalStatus,

                submittedAt:
                    Date.now(),

                lastUpdated:
                    Date.now()
            }
        );


        console.log(
            "FINAL RESULT:",
            {
                attempted,
                score,
                timeTaken,
                violations,
                status:
                    finalStatus
            }
        );


    } catch (error) {

        console.error(
            "Final save error:",
            error
        );
    }


    document.body.classList.add(
        "quiz-locked"
    );


    submitBtn.disabled =
        true;


    if (
        finalStatus ===
        "Submitted"
    ) {

        alert(
            "Quiz submitted successfully.\n\nPlease contact administrator for result."
        );
    }
}


// ========================================
// PREVIOUS
// ========================================

previousBtn.addEventListener(
    "click",
    () => {

        if (
            currentQuestion > 0 &&
            quizStarted &&
            !quizSubmitted
        ) {

            currentQuestion--;

            renderQuestion();
        }
    }
);


// ========================================
// NEXT
// ========================================

nextBtn.addEventListener(
    "click",
    () => {

        if (
            currentQuestion <
            questions.length - 1 &&
            quizStarted &&
            !quizSubmitted
        ) {

            currentQuestion++;

            renderQuestion();
        }
    }
);


// ========================================
// SUBMIT BUTTON
// ========================================

submitBtn.addEventListener(
    "click",
    async () => {

        if (
            !quizStarted ||
            quizSubmitted
        ) {
            return;
        }


        const confirmSubmit =
            confirm(
                "Are you sure you want to submit the quiz?"
            );


        if (!confirmSubmit) {
            return;
        }


        await submitQuiz(
            "Normal Submit"
        );
    }
);


// ========================================
// START TEST
// ========================================

startTestBtn.addEventListener(
    "click",
    async () => {

        console.log(
            "START TEST CLICKED"
        );


        const loaded =
            await loadQuestions();


        if (!loaded) {
            return;
        }


        startTestBtn.disabled =
            true;

        startTestBtn.innerText =
            "Starting Test...";


        try {

            await initializeStudent();


            answers = {};

            currentQuestion = 0;

            timeLeft =
                TOTAL_TIME;

            quizStarted =
                true;

            quizSubmitted =
                false;


            sessionStorage.setItem(
                "quizStarted",
                "true"
            );

            sessionStorage.setItem(
                "violations",
                "0"
            );


            // Fullscreen

            try {

                await document.documentElement
                    .requestFullscreen();

            } catch (error) {

                console.warn(
                    "Fullscreen error:",
                    error
                );
            }


            // Hide instruction

            startScreen.style.display =
                "none";


            // Show quiz

            quizContainer.style.display =
                "block";


            renderQuestion();

            updateTimer();

            startTimer();

            startSync();


            // Start security

            if (
                typeof window.startQuizSecurity ===
                "function"
            ) {

                window.startQuizSecurity();
            }


            console.log(
                "QUIZ STARTED"
            );


        } catch (error) {

            console.error(
                "Quiz start error:",
                error
            );


            quizStarted =
                false;


            startTestBtn.disabled =
                false;

            startTestBtn.innerText =
                "Start Test →";


            yearError.innerText =
                "Unable to start test. Please try again.";
        }
    }
);


// ========================================
// SECURITY SUBMIT CONNECTION
// ========================================

window.submitQuizFromSecurity =
    function (reason) {

        return submitQuiz(
            reason ||
            "Disqualified due to security violations."
        );
    };


console.log(
    "Brain Brawl Quiz JS Loaded"
);