DONE_CHECKMARK = "✅";
UNDONE_CHECKMARK = "☑";
sessionSec = 25 * 60;
breakSec = 5 * 60;
sessionNum = 0;
isBreak = false;
isTimerOn = false;
let timer;

const startResetButton = document.querySelector("#start-reset-button");
const timerSpan = document.querySelector("#timer");
const titleSpan = document.querySelector("#title");
const checkMarks = document.querySelectorAll(".checkmark");

startResetButton.onclick = () => {
    handleStartAndReset();
};

function handleStartAndReset() {
    if (isTimerOn) {
        isTimerOn = false;
    } else {
        isTimerOn = true;
    }

    if (isTimerOn) {
        startTimer();
    } else {
        resetTimer();
    }
}

function startTimer() {
    // Reset checkmarks.
    checkMarks.forEach((checkmark) => {
        checkmark.textContent = UNDONE_CHECKMARK;
    });

    countDown(sessionSec);
    titleSpan.textContent = "Work";
    startResetButton.textContent = "Reset";
}

function resetTimer() {
    isTimerOn = false;
    sessionNum = 0;

    clearInterval(timer);
    timerSpan.textContent = "00:00";
    startResetButton.textContent = "Start";
    titleSpan.textContent = "Timer";
}

function countDown(count) {
    timer = setInterval(() => {
        let countMin = Math.floor(count / 60);
        countMin = countMin < 10 ? `0${countMin}` : countMin;
        let countSec = count % 60;
        countSec = countSec < 10 ? `0${countSec}` : countSec;

        timerSpan.textContent = `${countMin}:${countSec}`;
        count--;

        if (count < 0) {
            if (isBreak) {
                isBreak = false;
            } else {
                sessionNum++;
                isBreak = true;
            }

            if (isBreak) {
                count = breakSec;
                titleSpan.textContent = "Break";
            } else {
                count = sessionSec;
                titleSpan.textContent = "Work";
            }

            if (sessionNum === 1) {
                checkMarks[0].textContent = DONE_CHECKMARK;
            } else if (sessionNum === 2) {
                checkMarks[1].textContent = DONE_CHECKMARK;
            } else if (sessionNum === 3) {
                checkMarks[2].textContent = DONE_CHECKMARK;
            } else if (sessionNum === 4) {
                checkMarks[3].textContent = DONE_CHECKMARK;

                resetTimer();
                titleSpan.textContent = "Completed!";
            }
        }
    }, 1000);
}
