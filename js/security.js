import { db } from "./firebase-config.js";

import {
    ref,
    update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


let violations = 0;
let securityStarted = false;
let disqualified = false;


// ========================================
// STUDENT
// ========================================

function getStudent() {

    const saved =
        sessionStorage.getItem(
            "currentStudent"
        );

    if (!saved) {
        return null;
    }

    try {
        return JSON.parse(saved);
    } catch {
        return null;
    }
}


// ========================================
// FIREBASE REF
// ========================================

function getStudentRef() {

    const student =
        getStudent();

    if (!student?.id) {
        return null;
    }

    return ref(
        db,
        `students/${student.id}`
    );
}


// ========================================
// VIOLATION COUNT
// ========================================

window.getViolationCount =
    function () {
        return violations;
    };


// ========================================
// UI
// ========================================

function updateUI() {

    const element =
        document.getElementById(
            "violationCount"
        );

    if (element) {

        element.innerText =
            `${violations}/3`;
    }
}


// ========================================
// SAVE LOCAL
// ========================================

function saveLocal() {

    sessionStorage.setItem(
        "violations",
        String(violations)
    );
}


// ========================================
// FIREBASE
// ========================================

async function saveViolation(
    status
) {

    const studentRef =
        getStudentRef();

    if (!studentRef) {
        return;
    }

    try {

        await update(
            studentRef,
            {
                violations:
                    violations,

                status:
                    status,

                lastUpdated:
                    Date.now()
            }
        );

    } catch (error) {

        console.error(
            "Violation save error:",
            error
        );
    }
}


// ========================================
// WARNING
// ========================================

function showWarning(
    reason
) {

    const modal =
        document.getElementById(
            "warningModal"
        );

    const message =
        document.getElementById(
            "warningMessage"
        );


    if (message) {

        if (
            violations === 1
        ) {

            message.innerText =
                `Violation detected: ${reason}\n\nThis is your first violation. Please be careful.`;

        } else {

            message.innerText =
                `Violation detected: ${reason}\n\nFINAL WARNING: One more violation will automatically disqualify you.`;
        }
    }


    if (modal) {

        modal.style.display =
            "flex";
    }
}


// ========================================
// DISQUALIFICATION
// ========================================

function showDisqualification() {

    const modal =
        document.getElementById(
            "disqualificationModal"
        );

    if (modal) {

        modal.style.display =
            "flex";
    }
}


// ========================================
// REGISTER VIOLATION
// ========================================

async function registerViolation(
    reason
) {

    if (
        !securityStarted ||
        disqualified
    ) {
        return;
    }


    violations++;


    if (
        violations > 3
    ) {
        violations = 3;
    }


    saveLocal();

    updateUI();


    console.warn(
        `VIOLATION ${violations}/3: ${reason}`
    );


    // First
    if (
        violations === 1
    ) {

        await saveViolation(
            "Active"
        );

        showWarning(
            reason
        );

        return;
    }


    // Second
    if (
        violations === 2
    ) {

        await saveViolation(
            "Active"
        );

        showWarning(
            reason
        );

        return;
    }


    // Third
    if (
        violations === 3
    ) {

        disqualified =
            true;


        sessionStorage.setItem(
            "disqualified",
            "true"
        );


        // Save FIRST
        await saveViolation(
            "Disqualified"
        );


        document.body.classList.add(
            "quiz-locked"
        );


        showDisqualification();


        // Then final submit
        if (
            typeof window.submitQuizFromSecurity ===
            "function"
        ) {

            await window.submitQuizFromSecurity(
                "Disqualified due to 3 violations."
            );
        }
    }
}


// ========================================
// TAB SWITCH
// ========================================

function handleVisibility() {

    if (
        !securityStarted ||
        disqualified
    ) {
        return;
    }


    if (
        document.visibilityState ===
        "hidden"
    ) {

        registerViolation(
            "You switched to another browser tab."
        );
    }
}


// ========================================
// FULLSCREEN
// ========================================

function handleFullscreen() {

    if (
        !securityStarted ||
        disqualified
    ) {
        return;
    }


    if (
        !document.fullscreenElement
    ) {

        registerViolation(
            "You exited fullscreen mode."
        );
    }
}


// ========================================
// START SECURITY
// ========================================

window.startQuizSecurity =
    function () {

        if (
            securityStarted
        ) {
            return;
        }


        securityStarted =
            true;

        disqualified =
            false;

        violations =
            0;


        saveLocal();

        updateUI();


        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );


        document.addEventListener(
            "fullscreenchange",
            handleFullscreen
        );


        const warningClose =
            document.getElementById(
                "warningCloseBtn"
            );


        if (warningClose) {

            warningClose.addEventListener(
                "click",
                () => {

                    const modal =
                        document.getElementById(
                            "warningModal"
                        );

                    if (modal) {

                        modal.style.display =
                            "none";
                    }
                }
            );
        }


        const disqualificationBtn =
            document.getElementById(
                "disqualificationBtn"
            );


        if (disqualificationBtn) {

            disqualificationBtn.addEventListener(
                "click",
                () => {

                    const modal =
                        document.getElementById(
                            "disqualificationModal"
                        );

                    if (modal) {

                        modal.style.display =
                            "none";
                    }
                }
            );
        }


        console.log(
            "SECURITY MONITORING STARTED"
        );
    };


console.log(
    "Brain Brawl Security Loaded"
);