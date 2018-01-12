const timeDisplay = document.querySelector(".display-time p");
const periodDisplay = document.querySelector(".display-period p");
const startBttn = document.querySelector("#start");
const options = document.querySelectorAll(".option");

let pomodoroOptions = {
    work: 0,
    short: 0,
    long: 0,
    cycles: 0
}

let currSecs;
let timer;
let isWorking = false;
let workCounter = 0;

function getOptions(){
    options.forEach(option => {
        if(option.classList.contains("time-option")){
            pomodoroOptions[option.dataset.type] = calculateSecs(parseInt(option.querySelector(".option-counter").textContent));
        } else{
            pomodoroOptions[option.dataset.type] = parseInt(option.querySelector(".option-counter").textContent);
        }
    });
    currSecs = pomodoroOptions.work;
}

function startPomodoro() {

    clearTimeout(timer);

    getOptions();

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
            if (workCounter === pomodoroOptions.cycles) {
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

function changeCounter(e) {
    const change = parseInt(e.target.dataset.change);
    if (change) {

        const newMins = parseInt(this.querySelector(".option-counter").textContent) + change;
        this.querySelector(".option-counter").textContent = formatZero(newMins);
    }
}

startBttn.addEventListener("click", startPomodoro);
options.forEach(option => option.addEventListener("click", changeCounter));