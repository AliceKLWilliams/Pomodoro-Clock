const cycles = 4;

const timeDisplay = document.querySelector(".display-time p");
const periodDisplay = document.querySelector(".display-period p");
const startBttn = document.querySelector("#start");
const options = document.querySelectorAll(".time-option");

let pomodoroOptions = {
    work: 0,
    short: 0,
    long: 0
}

let currSecs;
let timer;
let isWorking = false;
let workCounter = 0;

function startPomodoro() {

    clearTimeout(timer);

    currSecs = pomodoroOptions.work;

    setDisplay("Working", currSecs);
    isWorking = true;

    timer = setTimeout(updatePomodoro, 1000);
}

function updatePomodoro() {
    currSecs--;
    timeDisplay.textContent = getDisplayTime(currSecs);

    if (currSecs === -1) { //Reached End of current time period

        if (isWorking) {
            workCounter++;
            if (workCounter === cycles) {
                setDisplay("Long Break", pomodoroOptions.long);
                workCounter = 0;
            } else {
                setDisplay("Short Break", pomodoroOptions.short);
            }
        } else {
            setDisplay("Working", pomodoroOptions.work);
        }
        isWorking = !isWorking;
    }

    timer = setTimeout(updatePomodoro, 1000);
}

function setDisplay(periodName, time) {
    periodDisplay.textContent = periodName;
    currSecs = time;
    timeDisplay.textContent = getDisplayTime(currSecs);
}

function calculateSecs(minutes) {
    return minutes * 60;
}

function formatZero(time) {
    if (time <= 9 && time >= 0) {
        return "0" + time;
    } else {
        return time;
    }
}

function getDisplayTime(totalSeconds) {

    const minutes = formatZero(Math.floor(totalSeconds / 60));
    const seconds = formatZero(totalSeconds % 60);

    return `${minutes}:${seconds}`;
}

function changeTime(e) {
    const change = parseInt(e.target.dataset.change);
    if (change) {

        const newMins = parseInt(this.querySelector(".time-option-counter").textContent) + change;
        this.querySelector(".time-option-counter").textContent = formatZero(newMins);

        pomodoroOptions[this.dataset.option] = calculateSecs(newMins);
    }
}

startBttn.addEventListener("click", startPomodoro);
options.forEach(option => option.addEventListener("click", changeTime));