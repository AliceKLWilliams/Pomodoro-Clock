const workTime = 0.1;
const shortBreakTime = 0.1;
const longBreakTime = 0.1;
const cycles = 4;

const timeDisplay = document.querySelector("#time-left");
const periodDisplay = document.querySelector("#period");
const startBttn = document.querySelector("#start");

let currSecs = 0;
let timer;
let isWorking = false;
let workCounter = 0;

function startPomodoro(){

    setDisplay("Working", workTime);
    isWorking = true;

    timer = setTimeout(updatePomodoro, 1000);
}

function updatePomodoro(){
    currSecs--;
    timeDisplay.textContent = getDisplayTime(currSecs);

    if(currSecs === -1){ //Reached End of current time period

        if(isWorking){
            workCounter++;
            if(workCounter === cycles){
                setDisplay("Long Break", longBreakTime);
                workCounter = 0;
            } else{
                setDisplay("Short Break", shortBreakTime);
            }  
        }
        else{
            setDisplay("Working", workTime);
        }
        isWorking = !isWorking;
    }

    timer = setTimeout(updatePomodoro, 1000);
}

function setDisplay(periodName, time){
    periodDisplay.textContent = periodName;
    currSecs = calculateSecs(time);
    timeDisplay.textContent = getDisplayTime(currSecs);
}

function calculateSecs(minutes){
    return minutes*60;
}

function formatZero(time){
    if(time <= 9 && time >= 0){
        return "0"+time;
    } else{
        return time;
    }
}

function getDisplayTime(totalSeconds){
    const minutes = formatZero(Math.floor(totalSeconds/60));
    const seconds = formatZero(totalSeconds%60);

    return `${minutes}:${seconds}`;
}

startBttn.addEventListener("click", startPomodoro);

