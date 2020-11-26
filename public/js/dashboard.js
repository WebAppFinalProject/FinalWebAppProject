$(document).ready(() => {
    //global vars
    let isTeacher = false;
    let questionDetails = [];
    let userId = "";
    //set the container empty
    $("#content").empty();
    $("#content").append(
        ` <div class="container text-center h-100 w-100 m-center m-center" id="noExam">
        <span class="align-middle">
            <h3 class="text text-secondary">Retrieving Exams ...</h3>
        </span>
    </div>`
    );
    $("#noExam").hide();

    //chect the user id if present
    if ($("#userId").val()) {
        const id = $("#userId").val();
        userId = id;
        $(".hideIf").hide();
        //request the user by id
        apiRequest('/user/getuser/' + id, "get")
            .then((res) => {
                $("#username").text(`  ${res.user.firstname} ${res.user.lastname}`);
                console.log(res.user);
                if (res.user.position == "student") {
                    isTeacher = false;
                    studentView();
                }else if(res.user.position == "teacher"){
                   retirveExamByUserId(id);
                   isTeacher = true;
                }
            })
            .catch((error) => {
                console.log(error);
            })




    } else {
        $(".showIf").hide();
    }

    //validate Expiring date

    $('#expireDate').on("change", () => {
        validateDate($('#expireDate').val());
    })

    $("#1").show();
    //change the view when the user changes the type of question
    $("#multiplechoice").click((e) => {
        e.preventDefault();
        $("#1").show();
        $("#2").hide();
        $("#3").hide();
    });
    $("#trueorfalse").click((e) => {
        e.preventDefault();
        $("#1").hide();
        $("#2").show();
        $("#3").hide();
    });
    $("#identification").click((e) => {
        e.preventDefault();
        $("#1").hide();
        $("#2").hide();
        $("#3").show();
    });


    //this will show the question form
    $('#addQuestion').click(() => {
        $('#formQuestion').toggle();
    })

    //this will close the exam
    $('#closeExamForm').click(() => {
        if (confirm("Do you really want to cancel exam creation?")) {
            $("#createExamForm").hide();
            let ids = [
                "questionMultiple",
                "typeMulti",
                "correctAnsMulti",
                "a",
                "b",
                "c",
                "d",
                "questionTrue",
                "correctAnsTrue",
                "title",
                "expireDate",
                "timeLimit",
            ];
            resetFields(ids);
            $("#content").show();
        }
    });

    //this function will show the form create exam
    $('.createExam').click(() => {
        $('#createExamForm').show();
        $("#noExam").hide();
        $("#content").hide();
    })

    //this method will toggle the 
    //side bar of the dashboard
    $('#showMenu').click(() => {
        $("#sideb").toggle();
    });

    //this method will get the active exams
    $("#activeExamBtn").click(()=>{
        $("#content").empty();
        retrieveExamsByStatusAndId(userId, "activated");
    });

    //this method will get the expired exams
    $("#expiredExamBtn").click(()=>{
        $("#content").empty();
        retrieveExamsByStatusAndId(userId, "deactivated");
    });

    //////################## Methods To Request from the server ################/////
    //submit question multiple choice
    $('#submitMulti').click(() => {
        let ids = [
            "questionMultiple",
            "typeMulti",
            "correctAnsMulti",
            "a",
            "b",
            "c",
            "d"
        ];
        //use validation here
        let errors = AvoidEmpty(ids);

        if (isContainsError(errors)) {
            showErrors(errors);
        } else {

            let data = {
                question: $("#questionMultiple").val(),
                type: $("#typeMulti").val(),
                answerKey: $("#correctAnsMulti").val(),
                choices: [
                    $("#a").val(),
                    $("#b").val(),
                    $("#c").val(),
                    $("#d").val()
                ]
            };

            questionDetails.push(data);
            alert("question successfully added!");
            resetFields(ids);
        };  
    });


    //submits the true or false question
    $('#submitTrue').click(() => {
        let ids = [
            "questionTrue",
            "correctAnsTrue"
        ];
        let errors = AvoidEmpty(ids);

        if (isContainsError(errors)) {
            showErrors(errors);
        } else {
            let data = {
                question: $("#questionTrue").val(),
                type: $('#typeTrue').val(),
                answerKey: $("#correctAnsTrue").val(),
                choices: [
                    "true",
                    "false"
                ]
            };

            questionDetails.push(data);
            alert("question successfully added!");
            resetFields(ids);
        }
        
    });

    //submits the identification question
    $("#submitIden").click(() => {
        let ids = [
            "questionIden",
            "correctAnsIden"
        ];

        //use validation here
        let errors = AvoidEmpty(ids);
        if (isContainsError(errors)) {
            showErrors(errors);
        } else {
            let data = {
                question: $("#questionIden").val(),
                type: $('#typeIden').val(),
                answerKey: $("#correctAnsIden").val(),
                choices: null
            }

            questionDetails.push(data);
            alert("question successfully added!");
            resetFields(ids);
        }

        

        
    });

    //submit the exam
    $('#submitCreateExam').click(() => {
        let ids = [
            "title",
            "timeLimit"
        ];
        //use validation here
        let errors = AvoidEmpty(ids);
        if (isContainsError(errors)) {
            showErrors(errors);
        } else {
            let data = {
                author: userId,
                title: $('#title').val(),
                timeLimit: $("#timeLimit").val(),
                expireDate: $("#expireDate").val(),
                code: generateCode()
            }

            //send request to the server 
            //to save exam
            saveExamAndQuestions(data, questionDetails, userId);
            ids.push("expireDate");
            $("#createExamForm").toggle();
            resetFields(ids);
            $("#content").show();
        }
    });
})

/**
 * DOM MAnipulation functions
 */

//this function will loads the views for 
// a student user
function studentView() {
    $("#sideb").empty();
    $("#sideb").append(
        `<p class="text-left  p-4 dashMenu dashMenuActive"><a href="#" class="text-white">Exams</a></p>
        <p class="text-left  p-4 dashMenu"><a href="#">Expired Exams</a></p>
        <p class="text-left  p-4 dashMenu"><a href="#">Settings</a></p>`
    );
    $("#content").empty();
    $("#content").append(
        `<div class="container text-center h-100 w-100 m-center m-center" id="noExamJoined">
        <span class="align-middle">
            <h3 class="text text-secondary">Theres no Exams joined yet!</h3>
        </span>
        <span class="align-middle joinExam">
            <h5><a href="#" class="btn btn-primary mt-1">Join Exam</a></h5>
        </span>
        </div>`
    );
    $("#create-cont").empty();
    $("#create-cont").append(
        `<span class="mr-2 btn btn-white joinExam"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Join
        Exam</span>`
    );
}



/**
 * THIS FUNCTION CREATED BY THE DEVELOPERS
 * PLEASE DONT EDIT IT!
 */

//this fucntion will get all the exam created by the
//user login
function retirveExamByUserId(userId) {
    apiRequest(`/app/get/exam/${userId}`, "get")
        .then((res) => {
            if(res.exams.length <= 0){
                console.log("no exams");
                $("#noExam").show();
            }else{
                showExams(res.exams);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

function retrieveExamsByStatusAndId(userId, status){
    apiRequest(`/app/get/exam/${status}/${userId}`,"get")
        .then((res)=>{
            console.log(res);
            showExams();
        })
        .catch((error)=>{
            console.log(error);
        })
}


//this function will show the cards of exam
function showExams(exams){
    $("#content").empty();
    exams.forEach(exam => {
        $("#content").append(
            `<div class="col-md-3 mt-5 mx-4">
            <div class="card bg-dark">
                <img class="card-img-top" src="/static/img/cardbg1.jpg" alt="Card image">
                <div class="card-body text-white">
                    <span class="card-text">Exam title: ${exam.title}</span><br>
                    <span class="card-text">Exam code: ${exam.code}</span>
                    <br>
                    <button class="btn btn-success">Activate</button>
                    <button class="btn btn-warning">Edit</button>
                    <button class="btn btn-secondary">View</button>
                </div>
            </div>
        </div>`
        );
    });
}


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

