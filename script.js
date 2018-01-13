const timeDisplay = document.querySelector(".display-time p");
const periodDisplay = document.querySelector(".display-period p");
const startBttn = document.querySelector(".play");
const restartBttn = document.querySelector(".restart");
const options = document.querySelectorAll(".option");

let pomodoroOptions = {
    work: 0,
    short: 0,
    long: 0,
    cycles: 0
}

let currSecs;
let timer;
let isWorking = true;
let isPlaying = false;
let workCounter = 0;

function getOptions(){
    options.forEach(option => {

        const numOption = parseInt(option.querySelector(".option-counter").textContent);

        if(option.classList.contains("time-option")){
            pomodoroOptions[option.dataset.type] = calculateSecs(numOption);
        } else{
            pomodoroOptions[option.dataset.type] = numOption;
        }
    });

    currSecs = pomodoroOptions.work;
}

function togglePlay() {

    if(!isPlaying){
        startBttn.textContent = "❚❚";
        startBttn.classList.add("paused");
        startPomodoro();
    } else{
        startBttn.textContent = "▶";
        startBttn.classList.remove("paused");
        pausePomodoro();
    }
}

function pausePomodoro(){
    clearTimeout(timer);
    isPlaying = false;
}

function resetPomodoro(){
    resetOptions();
    getOptions();
    setDisplay("Working", currSecs);
}

function resetOptions(){
    pomodoroOptions = {
        work: 0,
        short: 0,
        long: 0,
        cycles: 0
    }

    workCounter = 0;
    isWorking = true;
}

function startPomodoro(){
    timer = setTimeout(updatePomodoro, 1000);
    isPlaying = true;
}

function updatePomodoro() {
    currSecs--;
    if(currSecs >= 0){
        timeDisplay.textContent = getDisplayTime(currSecs);
    }

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

        const newCount = parseInt(this.querySelector(".option-counter").textContent) + change;
        if(newCount > 0){
            this.querySelector(".option-counter").textContent = formatZero(newCount);
        }  
    }
}

startBttn.addEventListener("click", togglePlay);
restartBttn.addEventListener("click", resetPomodoro);
options.forEach(option => option.addEventListener("click", changeCounter));
resetPomodoro();
