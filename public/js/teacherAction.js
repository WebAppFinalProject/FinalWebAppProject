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