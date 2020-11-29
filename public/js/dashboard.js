$(document).ready(() => {
    //global vars
    let isTeacher = false;
    let questionDetails = [];
    let userId = "";
    //set the container empty
    $("#noExam").hide();
    $("#content").append(
        ` <div class="container text-center h-100 w-100 m-center m-center" id="noExam1">
        <span class="align-middle">
            <h3 class="text text-secondary">Retrieving Exams ...</h3>
        </span>
    </div>`
    );

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
                    //retrieve all the joined exam by the stuednt
                    getJoinedExam(userId);
                } else if (res.user.position == "teacher") {
                    retrieveExamsByStatusAndId(userId, "unactivated");
                    isTeacher = true;
                }
            })
            .catch((error) => {
                console.log(error);
            })

    } else {
        $(".showIf").hide();
    }
    
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
            retrieveExamsByStatusAndId(userId, "unactivated");
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

    //this method will get the exams created but not yet activated
    $("#sideb").on('click', '.examsBtn', () => {
        $("#content").empty();
        if (isTeacher) {
            retrieveExamsByStatusAndId(userId, "unactivated");
        } else {
            // call a function here
        }
        $(".examsBtn").addClass("dashMenuActive");
        $(".activeExamBtn").removeClass("dashMenuActive");
        $(".expiredExamBtn").removeClass("dashMenuActive");
        $(".settings").removeClass("dashMenuActive");
    });

    //this method will get the active exams
    $("#sideb").on('click', '.activeExamBtn', () => {
        $("#content").empty();
        if (isTeacher) {
            $("#noExam1").show();
            retrieveExamsByStatusAndId(userId, "activated");
        } else {
            //Do Somthing
        }
        $(".examsBtn").removeClass("dashMenuActive");
        $(".activeExamBtn").addClass("dashMenuActive");
        $(".expiredExamBtn").removeClass("dashMenuActive");
        $(".settings").removeClass("dashMenuActive");
    });

    //this method will get the expired exams
    $("#sideb").on('click', '.expiredExamBtn', () => {
        $("#content").empty();
        if (isTeacher) {
            retrieveExamsByStatusAndId(userId, "deactivated");
        } else {
            // call a function here
        }

        $(".examsBtn").removeClass("dashMenuActive");
        $(".activeExamBtn").removeClass("dashMenuActive");
        $(".expiredExamBtn").addClass("dashMenuActive");
        $(".settings").removeClass("dashMenuActive");

    });

    //this function will get the settig view
    $("#sideb").on('click', '.settings', () => {
        if (isTeacher) {
            //Do Something if teacher
        } else {
            //Do somthing if student
        }
        $("#content").empty();
        $(".examsBtn").removeClass("dashMenuActive");
        $(".activeExamBtn").removeClass("dashMenuActive");
        $(".expiredExamBtn").removeClass("dashMenuActive");
        $(".settings").addClass("dashMenuActive");

    });

    //////################## Methods To Request from the server from the Teacher part ################/////
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
            "timeLimit",
            "instruction"
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
                instruction: $("#instruction").val(),
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






    //this fucntion will activate the exam
    $(".container").on('click', '#activateExam', (e) => {
        let examId = e.target.name || e.target.id;
        let examCode = $("#examCode").text();
        updateExamById(examId, { "status": "activated" })
            .then((res) => {
                alert(`Give this exam code to your student\nExam Code: ${examCode}`);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    //this fucntion will view the exam
    $(".container").on('click', '#viewExam', (e) => {
        let examId = e.target.name || e.target.id;
        console.log(examId);
        //request the exam
        apiRequest(`/app/exam/${examId}`, 'get')
            .then((res) => {
                console.log(res.exam);
                viewExamDetails(res.exam);
            })
            .catch((error) => {
                console.log(error);
            });
    })





    ////#########STUDENT PART/########### //
    //this is for the student part
    //get the join button exam
    $("body").on('click', '.joinExam', () => {
        $("#joinExamForm").show();
    })

    //this will get the code 
    $("#classCodeBtn").click(() => {
        $("#joinExamForm").hide();
        getAndProcessCode($('#classCode').val(), "activated", userId);
    })

    //this will close the pop up
    $("#closeCodePopUp").click(() => {
        $("#joinExamForm").hide();
        $('#classCode').val("");

    });

})





/**
 * THIS FUNCTION CREATED BY THE DEVELOPERS
 * PLEASE DONT EDIT IT!
 */

//this fucntion will get all the exam created by the
//user login
function retirveExamByUserId(userId) {
    apiRequest(`/app/get/exam/${userId}`, "get")
        .then((res) => {
            if (res.exams.length <= 0) {
                console.log("no exams");
                $("#noExamBtn").show();
                $("#noExam").show();
            } else {
                showExams(res.exams);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

function retrieveExamsByStatusAndId(userId, status) {
    apiRequest(`/app/get/exam/${status}/${userId}`, "get")
        .then((res) => {
            console.log(res);
            if (res.exams.length <= 0) {
                $("#noExamMsg").text(`No ${status} exam yet!`);
                $("#noExam").show();
                $("#noExam1").hide();
            } else {
                showExams(res.exams);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

//this function will show the cards of exam
function showExams(exams) {
    $("#content").empty();
    exams.forEach(exam => {
        $("#content").append(
            `<div class="col-md-4 mt-5">
            <div class="card bg-dark position-relative">
                <div class="card-img-top"></div>
                <div class="position-absolute examTitle w-100">
                    <h2 class="text-center text-primary">${exam.title}</h2>
                    <h4 class="text-center text-secondary" id="examCode">${exam.code}</h4>
                </div>
                <div class="card-body text-white float-right">
                    <button title="Activate Exam" id="activateExam"  name="${exam._id}" class="btn btn-success"><i class="fas fa-power-off" id="${exam._id}"></i></button>
                    <button title="Edit Exam" id="editExam"  name="${exam._id}" class="btn btn-warning"><i class="fas fa-edit" id="${exam._id}"></i></button>
                    <button title="View Exam" id="viewExam"  name="${exam._id}" class="btn btn-secondary"><i class="fas fa-eye" id="${exam._id}"></i></button>
                </div>
            </div>
        </div>`
        );
    });
}

//this function will update the 
//exam
function updateExamById(ExamId, data) {
    return new Promise((resolve, reject) => {
        apiRequest(`/app/put/exam/${ExamId}`, "put", data)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
    })
}
