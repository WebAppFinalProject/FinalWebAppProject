//this function will save the exam ant the questions to the database
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
            retirveExamByUserId(userId);
        })
        .catch((error) => {
            console.log(error);
        })

}


//show exam 
function viewExamDetails(exam) {
    $("#content").empty();
    $("#content").append(
        `<div class=" container border bg-info mt-5">
        <h1 class="text-center mt-3 text-white" id="examTitle">${exam.title}</h1>

        <h5 class="text-white" id="code">Code: ${exam.code}</h5>

        <div class="container border bg-white">
            <h2 class="text-center">Exam Details</h2>
            <div class="position-center mb-5">
                <div class="container">
                    <h5 class="ml-5" id="expirationDate">Expiration Date: </h5>
                </div>
                <div class="container">
                    <h5 class="ml-5" id="timeLimit">Time Limit: ${exam.timeLimit} minutes</h5>
                </div>
                <div class="container">
                    <h5 class="ml-5 ">Status: ${exam.status}</h5>
                </div>
            </div>
        </div>
        <br>
        <div class="border bg-white mb-5">
            <h2 class="text-center">Questions</h2>
            <div class="accordion" id="accordionExample">
                <div class="card z-depth-0 bordered">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Question Number 1
                            </button>
                        </h5>
                    </div>
                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                            squid. 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    );
}

function showMultipleChoiceForm(){
    $("#1").show();
    $("#2").hide();
    $("#3").hide();
    $("#4").hide();
}

function showTrueForm(){
    $("#1").hide();
    $("#2").show();
    $("#3").hide();
    $("#4").hide();
}

function showIdenForm(){
    $("#1").hide();
    $("#2").hide();
    $("#3").show();
    $("#4").hide();
}


function editExam(exam){
    //plaese specify the needed information here

}   

//show the questions in table
function showQuestionTable(questions){
    $("#questionTable").empty();
    if(questions.length <=0){
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
                <button title="Edit Question" id="editQuestion"
                    class="btn btn-warning"><i class="fas fa-edit"
                        id=""></i></button>
                <button title="Delete Question" id="deleteQuestion" 
                    class="btn btn-danger "><i class="fas fa-trash"></i></button>
            </td>
        </tr>`
        );  
        counter++;      
    });
}