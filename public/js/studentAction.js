///STUDENTS VIEW FUCNTIONS
//if the student click the submit code
function getAndProcessCode(code, status, userId) {
    console.log(code, status);
    apiRequest(`/app/get/exam/v2/${code}/${status}`, "get")
        .then((res) => {
            console.log(res);
            //update the exam
            let studentsJoined = res.exam.students;
            //check if the students already joined the exam
            if (studentsJoined.includes(userId)) {
                alert("You already joined this exam!");
                return;

            } else {
                studentsJoined.push(userId);
                updateExamById(res.exam._id, { students: studentsJoined })
                    .then((res) => {
                        console.log(res);
                        //show the students joined exams
                        getJoinedExam(userId, "activated");
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        })
        .catch((error) => {
            if (error.responseJSON.message) {
                alert("Exam code is not valid!");
            } else {
                console.log(error);
            }
            $("#joinExamForm").show();
        })
}

//this fucntion will get the exams joined by the student
function getJoinedExam(userId, status) {
    apiRequest(`/app/get/student/exam/${userId}/${status}`,'get')
        .then((res) => {
            $("#content").empty();
            let view = (status === "activated")?'<span class="align-middle joinExam">'
            +'<h5><a href="#" class="btn btn-primary mt-1" id="noExamBtn">Join Exam</a></h5>'
            +'</span>':"";
            if(res.exams.length <= 0){   
                $("#content").append(`
                <div class="container text-center h-100 w-100 m-center m-center" id="noExam">
                    <span class="align-middle">
                        <h3 class="text text-secondary" id="noExamMsg">Theres no ${status} exam yet!</h3>
                    </span>
                    ${view}
                </div>`);
                $("#noExam1").hide();
                $("#noExam").show();
            }else{
                showExams(res.exams, {teacher: "hide",student: ""});
            }
        })
        .catch((error) => {
            alert("Something went wrong!");
            console.log(error);
        })
}


//this function will show the student view dashboard
function studentView() {
    $("#sideb").empty();
    $("#sideb").append(
        `<p class="text-left  p-4 dashMenu dashMenuActive examsBtn"><a href="#">Exams</a></p>
        <p class="text-left  p-4 dashMenu examHistory"><a href="#">Exam History</a></p>`
    );
    $("#create-cont").empty();
    $("#create-cont").append(
        `<span class="mr-2 btn btn-white joinExam"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Join
        Exam</span>`
    );
}

//this function will show the exam history for student
function showStudentExamHistory(examHistory) {
    let exam = examHistory.examId;

    $("#content").append(
        `<div class="col-md-4 mt-5">
        <div class="card bg-dark position-relative">
            <div class="card-img-top"></div>
            <div class="position-absolute examTitle w-100">
                <h2 class="text-center text-primary">${exam.title}</h2>
                <h4 class="text-center text-secondary" id="examCode">${exam.code}</h4>
            </div>
            <div class="card-body text-white float-right">
                <span title="Exam History"   id="${examHistory._id}" class="btn btn-success float-right viewExamHistory">View Exam History</span>
            </div>
        </div>
    </div>`
    );
}

//this function is called to add the questions needed
function addCorrectedQuestion(question, studentAnswer, isCorrect, points) {
    $("#questionAnswer").append(
        ` <p><b>Question: </b> ${question.question} </p>
        <p class="text-right">${points} point/s</p>
        <p><b>Correct answer:</b> ${question.answerKey} &nbsp;&nbsp;&nbsp; <i class="fa fa-check-circle text-success"></i></p>
        <p><b>Your answer:</b> ${studentAnswer} &nbsp;&nbsp;&nbsp; <i class="${isCorrect}"></i></p>
        <hr>`
    );
}

//this function will show the summary of the exam
function showExamSummary(examResult) {
    let studentAnswer = examResult.studentAnswer;
    let questions = examResult.examId.questions;
    $("#sub-nav").show();
    $("#content").empty();
    $("#content").append(
        `<div class="container bg-white mt-4">
        <div class="container bg-info border ">
            <div class="text-center">
                <h1>${examResult.examId.title}</h1>
                <h3>Questions / Answers</h3>
                <h4 class="text-white">Score: ${examResult.studentScore}/${examResult.totalScore}</h4>
            </div>
            <hr style ="border-bottom: 2px solid white;">
            <div class="container border bg-white mb-4" id="questionAnswer">
            </div>
        </div>`
    );
    console.log(studentAnswer, questions);
    questions.forEach(question => {
        let points = 0;
        let isCorrect = "fa fa-times-circle text-danger";
        if(question.answerKey.toLowerCase() == studentAnswer[0][question._id].toLowerCase()){
            points = question.points;
            isCorrect = "fa fa-check-circle text-success";
        }
        addCorrectedQuestion(question, studentAnswer[0][question._id], isCorrect, points);
    });
}


//this function will show the exam result and 
//allow the student to view the exam result
function showExamOverview(total, studentScore, examResultId) {
    $("#sub-nav").hide();
    $("#content").empty();
    $("#content").append(
        `<div class="container">
        <div class="container border bg-info mt-5">
            <div class="container bg-light mt-5 text-center">
                <h1 class="p-3 mt-2">Check your exam result</h1>
                <h3 class="p-3">Your Score: ${studentScore} / ${total}</h3>
            </div>
            <center>
                <button class="btn btn-blue text-white font-weight-bold text-primary mt-4 mb-4 viewExamHistory" id="${examResultId}" >View Summary of Exam</button>
                <a href="#" class="btn btn-secondary text-white activeExamBtn">Go to Exams</a>  
            </center>
        </div>        
     </div>`
    );
}
