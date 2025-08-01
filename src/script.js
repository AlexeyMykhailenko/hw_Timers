const timerOutput = document.getElementById("timer-output");
const timerStartBtn = document.getElementById("timer-start-btn");
const timerStopBtn = document.getElementById("timer-stop-btn");
const warning = document.getElementById("warning");
let timerId = null;
let hours = 1;
let minutes = 0;
let seconds = 0;

timerOutput.textContent = "01:00:00";

timerStartBtn.addEventListener("click", timerLoop);
timerStopBtn.addEventListener("click", stopTimer);

function timeFormatter(time) {
    return time.toString().padStart(2, "0");
};

function updateTimer() {
    timerOutput.textContent = `${timeFormatter(hours)}:${timeFormatter(minutes)}:${timeFormatter(seconds)}`;
};

function timerWarning() {
    warning.textContent = `Only ${minutes} minutes left!`;
    warning.style.display = "block";
};

updateTimer();

function timerLoop() {
    if (timerId !== null) return;

    hours = 1;
    minutes = 0;
    seconds = 0;

    updateTimer();

    timerId = setInterval(() => {

        if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(timerId);
            timerId = null;
            hours = 1;
            minutes = 59;
            seconds = 59;

            setTimeout(() => {
                timerOutput.textContent = `${hoursOutput}:${minutesOutput}:${secondsOutput}`;
                return;
            }, 2000);

            timerOutput.textContent = "Time is up!";
        };

        if (hours < 1 && minutes <= 58) {
            timerWarning();
        };

        if (seconds === 0) {
            if (minutes === 0) {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
            }
            else {
                minutes--;
                seconds = 59;
            }
        }
        else {
            seconds--;
        };


        updateTimer();

    }, 1000);
};

function stopTimer() {
    if (timerId === null) return;

    clearInterval(timerId);
    timerId = null;
    hours = 1;
    minutes = 0;
    seconds = 0;


    updateTimer();
};

const stopwatchOutput = document.getElementById("stopwatch-output");
const stopwatchStartBtn = document.getElementById("stopwatch-start-btn");
const stopwatchStopBtn = document.getElementById("stopwatch-stop-btn");
const secWarning = document.getElementById("stopwatch-warning");
let stopwatchId = null;
let secs = 30;
let ms = 99;

stopwatchOutput.textContent = "30.00"

stopwatchStartBtn.addEventListener("click", startStopwatch);
stopwatchStopBtn.addEventListener("click", stopStopwatch);

function stopwatchSecFormatter() {
    return secs.toString().padStart(2, "0");
};

function stopwatchMsFormatter() {
    return ms.toString().padStart(2, "0");
};

function stopwatchUpdate() {
    stopwatchOutput.textContent = `${stopwatchSecFormatter()}:${stopwatchMsFormatter()}`;
};

function resetStopwatch() {
    clearInterval(stopwatchId);
    stopwatchId = null;
    secs = 30;
    ms = 99;
    stopwatchOutput.classList.remove("warning-active");

    stopwatchOutput.textContent = "30.00";
    return;
};

function startStopwatch() {
    if (stopwatchId !== null) return;

    resetStopwatch();
    stopwatchUpdate();

    stopwatchId = setInterval(() => {
        if (secs === 0 && ms === 0) {
            resetStopwatch();
        };

        if (secs <= 10) {
            stopwatchOutput.classList.add("warning-active");
        };

        if (ms === 0) {
            if (secs > 0) {
                secs--;
                ms = 99;
            }
        } else {
            ms--;
        }

        stopwatchUpdate();
    }, 1);
};

function stopStopwatch() {
    resetStopwatch();
    stopwatchOutput.textContent = "30.00";
};

