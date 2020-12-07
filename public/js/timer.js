//the file is responsible for the timers

//this function is responsible for the timer in student side
var timer;
function examLimitTimer(timeLimit=1, exam, user) {
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
            Swal.fire("Time's Up", "", "warning");
            autoSubExam(exam._id, user);
        }
    }, 1000);
}

//only if needed
function endExamLimitTimer(){
    clearInterval(timer)
}


//check every 15 seconds if the exam is deactivated
var checkingMinute;
function checkDeactivationDate(examExpireDate, examId){
    let expireationDate = new Date(examExpireDate);
    checkingMinute = setInterval(()=>{
        let currentDate = new Date();
        console.log(currentDate);
        if(expireationDate <= currentDate){
            clearInterval(checkingMinute);
            deactivateExam(examId);
        }
    }, 15000)
}

//only if needed
function endExamCheckMinutes(){
    clearInterval(checkingMinute)
}
