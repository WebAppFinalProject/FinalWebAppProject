//the file is responsible for the timers

//this function is responsible for the timer in student side
var timer;
function examLimitTimer(timeLimit=1) {
    let minutes = timeLimit - 1; 
    let seconds = 59;
    timer = setInterval(()=>{
        if(seconds<=0){
            minutes-=1
            seconds = 60;
        }
        seconds -= 1;
        $("#timer").text(`Timer: ${minutes}: ${seconds}`);
        if(minutes <= -1){
            clearInterval(timer);
            $("#timer").text("Time's Up!");
        }
    }, 1000);
}

//only if needed
function endExamLimitTimer(){
    clearInterval(timer)
}


//check every menutes if the exam is deactivated
var checkingMinute;
function checkDeactivationDate(examExpireDate, examId){
    let expireationDate = new Date(examExpireDate);
    checkingMinute = setInterval(()=>{
        let currentDate = new Date();
        if(expireationDate == currentDate){
            clearInterval(checkDeactivationDate);
            deactivateExam(examId);
        }
    })
}

function endExamLimitTimer(){
    clearInterval(checkingMinute)
}
