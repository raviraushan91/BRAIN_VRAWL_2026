import { db } from "./firebase-config.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const studentTable =
    document.getElementById(
        "studentTable"
    );


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    seconds =
        Number(seconds || 0);


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        seconds % 60;


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );
}


// ========================================
// STATUS CLASS
// ========================================

function statusClass(status) {

    if (
        status === "Disqualified"
    ) {
        return "status-disqualified";
    }

    if (
        status === "Submitted"
    ) {
        return "status-submitted";
    }

    if (
        status === "Active"
    ) {
        return "status-active";
    }

    return "";
}


// ========================================
// LOAD STUDENTS
// ========================================

const studentsRef =
    ref(
        db,
        "students"
    );


onValue(
    studentsRef,
    snapshot => {

        const data =
            snapshot.val();


        if (!studentTable) {
            return;
        }


        studentTable.innerHTML =
            "";


        if (!data) {

            studentTable.innerHTML = `
                <tr>
                    <td colspan="9">
                        No students yet.
                    </td>
                </tr>
            `;

            return;
        }


        // Convert Firebase object to array

        const students =
            Object.values(data);


        // ====================================
        // RANKING
        // ====================================

        students.sort(
            (a, b) => {

                const aDisqualified =
                    a.status ===
                    "Disqualified";


                const bDisqualified =
                    b.status ===
                    "Disqualified";


                // Disqualified at bottom

                if (
                    aDisqualified &&
                    !bDisqualified
                ) {
                    return 1;
                }


                if (
                    !aDisqualified &&
                    bDisqualified
                ) {
                    return -1;
                }


                if (
                    !aDisqualified &&
                    !bDisqualified
                ) {

                    // Score high → low

                    const scoreA =
                        Number(
                            a.score || 0
                        );


                    const scoreB =
                        Number(
                            b.score || 0
                        );


                    if (
                        scoreA !==
                        scoreB
                    ) {

                        return (
                            scoreB -
                            scoreA
                        );
                    }


                    // Same score
                    // Lower time first

                    const timeA =
                        Number(
                            a.timeTaken || 0
                        );


                    const timeB =
                        Number(
                            b.timeTaken || 0
                        );


                    return (
                        timeA -
                        timeB
                    );
                }


                return 0;
            }
        );


        // ====================================
        // ASSIGN RANK
        // ====================================

        let rank = 0;


        students.forEach(
            student => {

                if (
                    student.status ===
                    "Disqualified"
                ) {

                    student.rank =
                        "—";

                } else {

                    rank++;

                    student.rank =
                        rank;
                }
            }
        );


        // ====================================
        // RENDER
        // ====================================

        students.forEach(
            student => {

                const row =
                    document.createElement(
                        "tr"
                    );


                const attempted =
                    Number(
                        student.attempted || 0
                    );


                const totalQuestions =
                    Number(
                        student.totalQuestions ||
                        75
                    );


                const score =
                    Number(
                        student.score || 0
                    );


                const violations =
                    Number(
                        student.violations || 0
                    );


                const timeTaken =
                    Number(
                        student.timeTaken || 0
                    );


                const timeRemaining =
                    Number(
                        student.timeRemaining || 0
                    );


                row.innerHTML = `

                    <td>
                        ${student.rank}
                    </td>

                    <td>
                        ${student.id || "—"}
                    </td>

                    <td>
                        ${student.name || "—"}
                    </td>

                    <td>
                        ${student.year || "—"}
                    </td>

                    <td>
                        ${attempted}/${totalQuestions}
                    </td>

                    <td>
                        ${score}
                    </td>

                    <td>
                        ${formatTime(timeRemaining)}
                    </td>

                    <td>
                        ${violations}/3
                    </td>

                    <td>
                        <span class="${statusClass(student.status)}">
                            ${student.status || "Ready"}
                        </span>
                    </td>

                `;


                studentTable.appendChild(
                    row
                );
            }
        );


        console.log(
            "Admin dashboard updated:",
            students.length
        );
    },

    error => {

        console.error(
            "Admin Firebase error:",
            error
        );
    }
);


console.log(
    "Brain Brawl Admin Loaded"
);