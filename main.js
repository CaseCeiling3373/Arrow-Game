var missionArr = [];
var missions = [];
var missionDiv = document.getElementById('mission');
var inputCount = 0;
var isGaming = false;
var score = 0;
var scoreDisplay = document.getElementById('score');
var level = 3;
var timerText = document.getElementById('timerText');
var timerBar = document.getElementById('timerBar');
var timeLeft;
var timeStart;
var timer;
var startBtn = document.getElementById('startBtn');

function randomizeMission(len){
    missionArr = [];
    for(var i=0; i<len; i++){
        var rand = Math.floor(Math.random() * 4) + 1;
        missionArr.push(rand);
    }
    console.log(missionArr)
}

function setNewMissions(){
    isGaming = true;
    inputCount = 0;
    missionDiv.innerHTML = '';
    missions = [];
    randomizeMission(level);
    for(var j=0; j<missionArr.length; j++){
        var m = document.createElement('div');
        m.classList.add('arrow');
        if(missionArr[j] == 1){
            m.classList.add('up');
        }else if(missionArr[j] == 2){
            m.classList.add('down');
        }else if(missionArr[j] == 3){
            m.classList.add('left');
        }else if(missionArr[j] == 4){
            m.classList.add('right');
        }
        missionDiv.appendChild(m);
        missions.push(m);
    }
}

function inputCheck(event){
    if(isGaming == false) return;

    if(event.keyCode ==38){
        wrCheck(1); //up
    }if(event.keyCode ==40){
        wrCheck(2); //down
    }if(event.keyCode ==37){
        wrCheck(3); //left
    }if(event.keyCode ==39){
        wrCheck(4); //right
    }
}

function wrCheck(key){
    if(key == missionArr[inputCount]){
        //right input
        missions[inputCount].classList.add('correct');
        inputCount ++ ;
        if(inputCount == missionArr.length){
            setNewMissions();
            score += 100;
            scoreDisplay.innerHTML = score;
        }
    }else{
        //wrong input
        missions[inputCount].classList.add('wrong');
        setTimeout(setNewMissions, 500);
    }
}

function gameStart(num){ 
    startBtn.style.visibility = 'hidden';
    level = num;
    timeStart = new Date();
    timeLeft = 60;
    updateTimer();
    setNewMissions();
    timer = setInterval(() => {
        timeLeft = Math.floor(timeStart.getTime()/10 - new Date().getTime()/10 + 6000) /100;
        updateTimer();
    }, 100);
}

function updateTimer(){
    if (timeLeft <= 0){
        isGaming = false;
        clearInterval(timer);
        timeLeft = 0;
        startBtn.style.visibility = 'visible';
    }
    timerText.innerHTML = timeLeft;
    var width = timeLeft / 60 * 100;
    timerBar.style.width = width + "%";
}

document.addEventListener('keydown', inputCheck);