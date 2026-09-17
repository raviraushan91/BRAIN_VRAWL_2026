// ========================================
// BRAIN BRAWL 2026 - OPEN STUDENT LOGIN
// ========================================

import { db } from "./firebase-config.js";

import {
    ref,
    set,
    runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ========================================
// HTML ELEMENTS
// ========================================

const loginForm =
    document.getElementById("loginForm");

const studentName =
    document.getElementById("studentName");

const password =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");


// ========================================
// GENERATE UNIQUE STUDENT ID
// ========================================

async function generateStudentId() {

    const counterRef =
        ref(db, "settings/studentCounter");


    const result =
        await runTransaction(
            counterRef,
            currentValue => {

                if (
                    typeof currentValue !== "number"
                ) {

                    return 1;

                }

                return currentValue + 1;

            }
        );


    if (!result.committed) {

        throw new Error(
            "Could not generate student ID."
        );

    }


    const number =
        result.snapshot.val();


    return `QZ${String(number).padStart(3, "0")}`;

}


// ========================================
// PASSWORD VALIDATION
// ========================================

function validatePassword(
    name,
    enteredPassword
) {

    // Remove spaces and special characters
    // from name

    const lettersOnly =
        name
            .replace(/[^a-zA-Z]/g, "")
            .toUpperCase();


    // ========================================
    // NAME LENGTH
    // ========================================

    if (
        lettersOnly.length < 4
    ) {

        return {

            valid: false,

            message:
                "Name must contain at least 4 letters."

        };

    }


    // ========================================
    // FIRST 4 LETTERS OF NAME
    // ========================================

    const firstFour =
        lettersOnly.substring(0, 4);


    // ========================================
    // PASSWORD LENGTH
    // ========================================

    if (
        enteredPassword.length !== 8
    ) {

        return {

            valid: false,

            message:
                "Password must contain 4 capital letters + 4 digit birth year."

        };

    }


    // ========================================
    // FIRST 4 MUST BE CAPITAL LETTERS
    // ========================================

    const passwordFirstFour =
        enteredPassword.substring(0, 4);


    if (
        passwordFirstFour !==
        passwordFirstFour.toUpperCase()
    ) {

        return {

            valid: false,

            message:
                "First 4 letters of password must be in CAPITAL letters."

        };

    }


    // ========================================
    // FIRST 4 MUST MATCH NAME
    // ========================================

    if (
        passwordFirstFour !==
        firstFour
    ) {

        return {

            valid: false,

            message:
                `Password must start with ${firstFour} in CAPITAL letters.`

        };

    }


    // ========================================
    // LAST 4 MUST BE DIGITS
    // ========================================

    const birthYear =
        enteredPassword.substring(4, 8);


    if (
        !/^\d{4}$/.test(birthYear)
    ) {

        return {

            valid: false,

            message:
                "Last 4 characters of password must be your DOB year."

        };

    }


    // ========================================
    // PASSWORD VALID
    // ========================================

    return {

        valid: true

    };

}


// ========================================
// CREATE NEW STUDENT
// ========================================

async function createStudent(
    name
) {

    const studentId =
        await generateStudentId();


    const studentRef =
        ref(
            db,
            `students/${studentId}`
        );


    const studentData = {

        id:
            studentId,

        name:
            name,

        attempted:
            0,

        totalQuestions:
            10,

        score:
            0,

        timeRemaining:
            3600,

        timeTaken:
            0,

        violations:
            0,

        status:
            "Ready",

        createdAt:
            Date.now(),

        lastUpdated:
            Date.now()

    };


    await set(
        studentRef,
        studentData
    );


    return {

        id:
            studentId,

        name:
            name

    };

}


// ========================================
// LOGIN
// ========================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // Clear previous error

        loginError.innerText =
            "";


        // ========================================
        // GET NAME
        // ========================================

        const name =
            studentName.value.trim();


        // ========================================
        // GET PASSWORD
        // IMPORTANT:
        // DO NOT convert to uppercase
        // ========================================

        const enteredPassword =
            password.value.trim();


        // ========================================
        // NAME VALIDATION
        // ========================================

        if (!name) {

            loginError.innerText =
                "Please enter your full name.";

            return;

        }


        // ========================================
        // PASSWORD EMPTY
        // ========================================

        if (!enteredPassword) {

            loginError.innerText =
                "Please enter your password.";

            return;

        }


        // ========================================
        // PASSWORD VALIDATION
        // ========================================

        const validation =
            validatePassword(
                name,
                enteredPassword
            );


        if (!validation.valid) {

            loginError.innerText =
                validation.message;

            return;

        }


        // ========================================
        // SUBMIT BUTTON
        // ========================================

        const submitButton =
            loginForm.querySelector(
                "button[type='submit']"
            );


        if (submitButton) {

            submitButton.disabled =
                true;

            submitButton.innerText =
                "Creating Entry...";

        }


        // ========================================
        // CREATE STUDENT
        // ========================================

        try {

            const student =
                await createStudent(
                    name
                );


            // ========================================
            // SAVE STUDENT SESSION
            // ========================================

            sessionStorage.setItem(
                "currentStudent",
                JSON.stringify(student)
            );


            // ========================================
            // CLEAR OLD QUIZ SESSION
            // ========================================

            sessionStorage.removeItem(
                "quizState"
            );

            sessionStorage.removeItem(
                "violations"
            );

            sessionStorage.removeItem(
                "disqualified"
            );

            sessionStorage.removeItem(
                "quizStarted"
            );


            // ========================================
            // OPEN QUIZ / INSTRUCTION PAGE
            // ========================================

            window.location.href =
                "quiz.html";

        }

        catch (error) {

            console.error(
                "Student creation error:",
                error
            );


            loginError.innerText =
                "Unable to create your test entry. Please try again.";


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "Continue →";

            }

        }

    }
);