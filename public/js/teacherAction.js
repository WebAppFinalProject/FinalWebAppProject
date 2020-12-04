/**
 * This function will save the exams and questions to the database
 * @param {*} Exam 
 * @param {*} Questions 
 * @param {*} userId 
 */
async function saveExamAndQuestions(Exam, Questions, userId) {
    let questionIds = [];
    for (let question of Questions) {
        //save every question created
        await apiRequest("/app/add/question", "post", question)
            .then((res) => {
                questionIds.push(res.questionId);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //save exam 
    Exam["questions"] = questionIds;
    apiRequest("/app/add/exam", "post", Exam)
        .then((res) => {
            alert(res.message);
            retrieveExamsByStatusAndId(userId, "unactivated");
        })
        .catch((error) => {
            console.log(error);
        })
}


function deactivateExam(examId) {
    let updates = {
        "status": "deactivate"
    };
    updateExamById(examId, updates)
        .then((res) => {
            console.log(res);
            Swal.fire({
                icon: "info",
                text: `${res.update.title} is deactivated!`,
                timer: 3000
            });
            retrieveExamsByStatusAndId(examId, "activated");
        })
        .catch((error) => {
            console.log(error);
        })
}




//######THIS THE VIEW FUNCTION ###////

/**
 * This function will be called when the
 * teacher wants to view the exam he/she created 
 * @param {*} exam 
 */
function viewUnactivatedExamDetails(exam) {
    $("#content").empty();
    $("#content").append(
        `<div class=" container border bg-info mt-5">
        <button class="btn btn-info text-white float-right examsBtn">back</button>
        <h1 class="text-center mt-3 text-white" id="examTitle">${exam.title}</h1>

        <h5 class="text-white" id="code">Code: ${exam.code}</h5>

        <div class="container border bg-white">
            <h2 class="text-center">Exam Details</h2>
            <div class="position-center mb-5">
                <div class="container">
                    <h5 class="ml-5" id="expirationDate">Exam Span: ${exam.examSpan} </h5>
                </div>
                <div class="container">
                    <h5 class="ml-5" id="timeLimit">Time Limit: ${exam.timeLimit} minutes</h5>
                </div>
                <div class="container">
                    <h5 class="ml-5 ">Status: ${exam.status}</h5>
                </div>
                <span class="btn btn-warning text-white float-right editExam" id="${exam._id}"><i class="fas fa-pen-square" id="${exam._id}"></i>&nbsp;<b id="${exam._id}">Edit Exam</b></span>
            </div>
        </div>
        <br>
        <div class="border bg-white mb-5">
        <table class="table table-hover">
            <thead>
                <tr>
                    <td ><b>#</b></td>
                    <td ><b>question</b></td>
                    <td ><b>type</b></td>
                </tr>
            </thead>
            <tbody id="questionInTable">
                
            </tbody>
        </table>
        </div>
    </div>`
    );

    for(let i=0; i < exam.questions.length;i++){
        appendQuestion(exam.questions[i], i+1, "questionInTable");
    }
}


//show the exam result 
function showExamResultGraph(examResult, resId){
    let exam = examResult[0].examId;
    $("#content").empty();
    $("#content").append(
        `<div class=" container border bg-info mt-5">
            <button class="btn btn-info text-white float-right examsBtn">back</button>
            <h1 class="text-center mt-3 text-white" id="examTitle">${exam.title}</h1>

            <h5 class="text-white" id="code">Code: ${exam.code}</h5>

            <div class="container border bg-white">
                <h2 class="text-center">Exam Details</h2>
                <div class="position-center mb-5">
                    <div class="container">
                        <h5 class="ml-5" id="timeLimit">Time Limit: ${exam.timeLimit} minutes</h5>
                    </div>
                    <div class="container">
                        <h5 class="ml-5 ">Status: ${exam.status}</h5>
                    </div>
                </div>
            </div>
            <div class="container border bg-white" >
                <div class="border mt-5">
                    <h3 class="text-center">Number of Students who got the correct answer </h3>
                    <canvas class="mt-2 ml-2 mr-2 mb-2" id="analytics" name="${resId}" width="500" height="300"></canvas>
                </div>

            </div>
            <br>
            <div class="container border bg-white">
                <h3 class="text-center">Exam Question List</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <td ><b>#</b></td>
                            <td ><b>question</b></td>
                            <td ><b>type</b></td>
                        </tr>
                    </thead>
                    <tbody id="questionInTable1">
                        
                    </tbody>
                </table>
            </div>

            <br>
            <div class="container border bg-white">
            <h3 class="text-center">Student List</h3>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <td ><b>#</b></td>
                        <td ><b>name</b></td>
                    </tr>
                </thead>
                <tbody id="studentsInTable1">
                    
                </tbody>
            </table>
        </div>
            <br>
            <br>
            <br>
            <br>
            <script src="/static/js/analyticsGraph.js"></script>
        </div>`);
        
        for(let i=0; i < examResult[0].examId.questions.length;i++){
            appendQuestion(examResult[0].examId.questions[i], "Q"+(i +1), "questionInTable1");
        }
        for(let i=0; i < examResult.length;i++){
            appendStudent(examResult[i].studentId, i+1, "studentsInTable1");
        }
}

function appendStudent(element, counter, id){
    $(`#${id}`).append(
        ` <td>${counter}</td>
          <td>${element.firstname + " " + element.lastname}</td>`
    );
}

function appendQuestion(element, counter, id){
    $(`#${id}`).append(
        `<tr>
        <td>${counter}</td>
        <td>${element.type}</td>
        <td>${element.question}</td>
        </tr>`
    );
}


function showMultipleChoiceForm() {
    $("#1").show();
    $("#2").hide();
    $("#3").hide();
    $("#4").hide();
}

function showTrueForm() {
    $("#1").hide();
    $("#2").show();
    $("#3").hide();
    $("#4").hide();
}

function showIdenForm() {
    $("#1").hide();
    $("#2").hide();
    $("#3").show();
    $("#4").hide();
}


/**
 * This function is invoked when a teacher wants to edit the 
 * exam
 * @param {*} exam 
 */
function editExam(exam) {
    //plaese specify the needed information here
    $("#content").hide();
    $("#formTitle").text("Edit Exam");
    $("#title").val(exam.title);
    $("#timeLimit").val(exam.timeLimit);
    $("#examSpan").val(exam.examSpan);
    $("#instruction").val(exam.instruction);
    $("#testButton").html(`<button class="btn btn-blue text-white mt-5 ${exam._id}" id="editExamCreated">Edit Exam</button>`);
    $("#createExamForm").show();
}

/**
 * This fucntion will show the question in details
 * via table
 * @param {*} questions 
 */
function showQuestionTable(questions) {
    $("#questionTable").empty();
    if (questions.length <= 0) {
        $("#questionTable").html(
            `<tr class="col">
                <td></td>
                <td class="text-secondary text-center">No questions created!</td>
                <td></td>
            </tr>`
        );
    }
    let counter = 0;
    questions.forEach(question => {
        $("#questionTable").append(
            `<tr class="col">
            <td>${counter}</td>
            <td>${question.question}</td>
            <td>${question.type}</td>
            <td>
                <button title="View Question"  name ="${counter}" 
                    class="btn btn-warning viewQuestion"><i class="fas fa-eye ${counter} "></i></button>
                <button title="Delete Question"  name ="${counter}" 
                    class="btn btn-danger deleteQuestion"><i   class="fas fa-trash ${counter}"></i></button>
            </td>
        </tr>`
        );
        counter++;
    });
}

/**
 * This function is use to show the identification question form 
 * this is needed when the teacher edits this question
 * @param {*} questionDetails 
 */
function showIdentEditForm(questionDetails) {
    console.log("I was here");
    $("#fixedWidthForm").empty()
    $("#fixedWidthForm").append(
        `<div id="3" class="border identification">
        <h4 class="text-center mt-3">Identification</h4>
        <form>
            <input type="hidden" value="identification" id="typeIdenE">
            <label>Question(required): </label>
            <input type="text" id="questionIdenE" class="form-control" value="${questionDetails.question}" placeholder="Enter Question ...">
            <label>Correct Answer(required): </label><br>
            <small class="text-warning"><i>Note: If there are many possible answer please specify using a
                    <b>comma</b> ( <b>,</b> ).</i></small><br>
            <small class="text-warning"><i>WARNING: please follow the convention properly else it wont work
                    properly</i></small>
            <input type="text" id="correctAnsIdenE" class="form-control" value="${questionDetails.answerKey}" placeholder="Enter answer ...">

            <input type="button" id="submitIdenE" value="Edit Question"
                class="btn btn-secondary float-right mt-2 mr-1">
            <input type="button" value="cancel"
                class="btn btn-danger float-right mt-2 mr-1 closeForm">
            <br>
            <br>
        </form>
    </div>`
    );
}

/**
 * This function will show the true or false question form
 * This function is needed when the teachers edits the question
 * @param {*} questionDetails 
 */
function showTrueorFalseEditForm(questionDetails) {
    $("#fixedWidthForm").empty()
    $("#fixedWidthForm").append(
        `<div id="2" class="border trueorfalse">
        <h4 class="text-center mt-3">True or False</h4>
        <form>
            <input type="hidden" value="trueorfalse" id="typeTrueE">
            <label>Question(required): </label>
            <input type="text" id="questionTrueE" class="form-control" value="${questionDetails.question}" placeholder="Enter Question ...">
            <p class="  mt-4">Correct Answer(required):</p>

            <select name="" class="form-control" id="correctAnsTrueE" value="${questionDetails.answerKey}">
                <option value=""></option>
                <option value="true">True</option>
                <option value="false">False</option>
            </select>

            <input type="button" id="submitTrueE" value="Edit Question"
                class="btn btn-secondary float-right mt-2 mr-1">
            <input type="button" value="cancel"
                class="btn btn-danger float-right mt-2 mr-1 closeForm">
            <br>
            <br>
        </form>
    </div>`
    );
}


/**
 * This function will show the multiple choice exam form
 * This fucntion is needed when the teacher edits a question
 * @param {*} questionDetails 
 */
function showMultipleChoiceEditForm(questionDetails) {
    $("#fixedWidthForm").empty()
    $("#fixedWidthForm").append(
        ` <div id="1" class="border multiplechoice">
        <h4 class="text-center mt-3">Multiple Choice</h4>
        <form class="form-group">
            <label>Question(required): </label>
            <input type="hidden" value="multiplechoice" id="typeMultiE">
            <input type="text" id="questionMultipleE" class="form-control" value="${questionDetails.question}" placeholder="Enter Question ...">
            <div class="mt-4 ">
                <p>Enter Choices(required):</p>
                <label>A: <input id="aE" type="text" value="${questionDetails.choices[0].A}"></label><br>
                <label>B: <input id="bE" type="text" value="${questionDetails.choices[1].B}"></label><br>
                <label>C: <input id="cE" type="text" value="${questionDetails.choices[2].C}"></label><br>
                <label>D: <input id="dE" type="text" value="${questionDetails.choices[3].D}"></label>
            </div>
            <p class="mt-4">Correct Answer(required):</p>

            <select class="form-control" name="" id="correctAnsMultiE" value="${questionDetails.answerKey}">
                <option value=""></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
            <br>

            <input type="button" id="submitMultiE" value="Edit Question"
                class="btn btn-secondary float-right mt-2 mr-1">
            <input type="button" value="cancel"
                class="btn btn-danger float-right mt-2 mr-1 closeForm">
            <br>
            <br>
        </form>
    </div>`
    );
}



//this function will show the cards of exam
function showExams(exams, data = { teacher: "", student: "hide" }) {
    $("#noExam").hide();

    exams.forEach(exam => {
        let timer = "";
        let buttons = `<button title="Activate Exam" name="${exam._id}" class="btn btn-success activateExam ${data.teacher}"><i class="fas fa-power-off" id="${exam._id}"></i></button>
        <button title="View Exam" name="${exam._id}" class="btn btn-secondary viewExam ${data.teacher}"><i class="fas fa-eye" id="${exam._id}"></i></button>
        <button title="Delete Exam"  name="${exam._id}" class="btn btn-danger deleteExam ${data.teacher}"><i class="fas fa-trash" id="${exam._id}"></i></button>
        <span title="Take Exam"   id="${exam._id}" class="btn btn-success float-right takeQuiz ${data.student}">Take Quiz</span>`;
        if (exam.status == "activated") {
            buttons = `<span title="Students joined the Exam"   id="${exam._id}" class="btn btn-secondary float-right Students Joined ${data.teacher}">Joined students</span>
            <span title="Deactivate Exam" id="${exam._id}" class="btn btn-danger float-right deactivateExam ${data.teacher} mr-2">Deactivate</span>`;
            let expireDate = new Date(exam.expireDate);
            let formatted_date = expireDate.getFullYear() + "-" + (expireDate.getMonth() + 1) + "-" + expireDate.getDate() + " " + expireDate.getHours() + ":" + expireDate.getMinutes() + ":" + expireDate.getSeconds()
            timer = `<small id="examTimerSpan" class="text-center text-success">${(exam.expireDate == null) ? "No expireDate" : `The Exam will expire on ${formatted_date}`}</small>`;
        }
        if (exam.status == "deactivate") {
            buttons = `<span title="view Result" id="${exam._id}" class="btn btn-info float-right viewExamResult ${data.teacher} mr-2">View Exam Result</span>`;
        }

        $("#content").append(
            `<div class="col-md-4 mt-5">
            <div class="card bg-dark position-relative">
                <div class="card-img-top"></div>
                <div class="position-absolute examTitle w-100">
                    <h2 class="text-center text-primary">${exam.title}</h2>
                    <h4 class="text-center text-secondary" id="examCode">${exam.code}</h4>
                    <h6 class="text-center text-secondary  ${data.student}" id="author">Teacher: ${exam.author.firstname + " " + exam.author.lastname}<br>
                    <small class="text-danger">You are given ${exam.timeLimit} minutes to finish this exam <br></small></h6>

                </div>
                ${timer}
                <div class="card-body text-white float-right">
                    
                    ${buttons}
                    <span title="Take Exam"   id="${exam._id}" class="btn btn-success float-right takeQuiz ${data.student}">Take Quiz</span>
                </div>
            </div>
        </div>`
        );
    });
}


/**
 * This function will update the exam
 * using its id
 * @param {*} ExamId 
 * @param {*} data 
 */
function updateExamById(ExamId, data) {
    return new Promise(async (resolve, reject) => {
        let questionIds = [];
        if(data.questions) {
            for(let question of data.questions){
                
                let query = (question._id)?`/app/update/question/${question._id}`:`/app/add/question`;
                let method = (question._id)?"put":`post`;
                
                await apiRequest(query,method, question)
                .then((res)=>{
                    questionIds.push(res.questionId);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }
        console.log(questionIds);
        data["questions"] = questionIds;
        apiRequest(`/app/put/exam/${ExamId}`, "put", data)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

function updateQuestionById(question, data){
   
    return new Promise((resolve, reject)=>{
       
    });
}
