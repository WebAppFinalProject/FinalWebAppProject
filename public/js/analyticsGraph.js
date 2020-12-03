var densityCanvas = document.getElementById("analytics");
var resultExam = [];
$(document).ready(async () => {
    //view the exam result 
    console.log("Example")
    let resultExamId = $("#analytics").attr("name");
    await apiRequest(`/app/analytics/${resultExamId}`, 'get')
        .then((res) => {
            resultExam = res;
        })
        .catch((error) => {
            console.log(error);
        })
      
        console.log(resultExam);
        let examQuestions = resultExam[0].examId.questions;
        let CorrectAnswer = getObjectCorrectAnswer(examQuestions);

        // console.log();
        
        let data = convertObjectToArray(checkCorrectAnswer(resultExam, CorrectAnswer));
        let labels =  generateData(examQuestions.length);
        var densityData = {
            label: 'Students',
            data: data,
            borderColor: 'rgba(255,0,0,0.2)',
            backgroundColor: 'rgba(0,0,255,240)',
            hoverBackgroundColor: 'rgba(0,0,255,0.5)'

        };

        console.log(data, labels);
        test(densityCanvas, densityData, labels);
})

function checkCorrectAnswer(examResult, correctAns){
    let evaluatedAnswers = {...correctAns};
    for(let key in evaluatedAnswers){
        evaluatedAnswers[key] = 0;
    }
    examResult.forEach(result => {
        let studentAns = getObjectStudentAnswer(result.studentAnswer);
        for(let key in studentAns){
            if(studentAns[key].toLowerCase() == correctAns[key].toLowerCase()){
                evaluatedAnswers[key] += 1;
            }
        }
    })
    return evaluatedAnswers;
}

function generateData(NumberOfStudents) {
    let arr = [];
    for(let i = 0; i < NumberOfStudents; i++) {
        arr.push("Q"+(i+1));
    }
    return arr;
}

function convertObjectToArray(object){
    let arr =[];
    for(let key in object){
        arr.push(object[key]);
    }
    return arr;
}

function getObjectStudentAnswer(studentAns) {
    let studentAnsArr = {};
    studentAns.forEach(ans => {
        for(let key in ans){
            studentAnsArr[key] = ans[key];
        }
    })
    return studentAnsArr;
}

function getObjectCorrectAnswer(questions){
    let ObjectCorrectAnswer = {};
   
    questions.forEach(question => {
        ObjectCorrectAnswer[question._id] = question.answerKey;
    });
   return ObjectCorrectAnswer;
}

function test(densityCanvas, densityData, labels) {
    var barChart = new Chart(densityCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [densityData]
        }
    });
}
