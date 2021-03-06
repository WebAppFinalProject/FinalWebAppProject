
$(document).ready(() => {
    //global vars
    let isTeacher = false;
    let questionDetails = [];
    let userId = "";
    let questionId = "";
    let userInfo = "";






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
                userInfo = res.user;
                if (res.user.position == "student") {
                    isTeacher = false;
                    studentView();
                    //retrieve all the joined exam by the stuednt
                    getJoinedExam(userId, "activated");
                } else if (res.user.position == "teacher") {
                    subscribeTo(`exam/${userId}`, client);
                    retrieveExamsByStatusAndId(userId, "unactivated");
                    apiRequest(`/app/get/exam/${"activated"}/${userId}`, "get")
                        .then((res) => {
                            res.exams.forEach(exam => {
                                if (exam.expireDate != null) {
                                    checkDeactivationDate(exam.expireDate, exam._id);
                                }
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    isTeacher = true;
                }
                $("#noExam1").hide();
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
        showMultipleChoiceForm();
    });

    $("#trueorfalse").click((e) => {
        e.preventDefault();
        $("#1").hide();
        showTrueForm();
    });

    $("#identification").click((e) => {
        e.preventDefault();
        showIdenForm();
    });

    $("#viewQuestion").click((e) => {
        e.preventDefault();
        showQuestionTable(questionDetails);
        $('#formQuestion').show();
        $("#1").hide();
        $("#2").hide();
        $("#3").hide();
        $("#4").show();
    });

    //this will show the question form
    $('#addQuestion').click(() => {
        $("#identification").click();
        $('#formQuestion').show();
    })

    // this part will show the edit form of a question
    $("body").on('click', '.viewQuestion', (e) => {
        let id = e.target.name || e.target.classList[2];
        let question = questionDetails[id];
        questionId = id;

        console.log(question);
        if (question.type == "multiplechoice") {
            showMultipleChoiceEditForm(question);
        }
        if (question.type == "trueorfalse") {
            showTrueorFalseEditForm(question);
        }
        if (question.type == "identification") {
            showIdentEditForm(question);
        }
        $("#editQuestionForm").toggle();

    })


    //this function will delete the exam
    $("body").on('click', '.deleteQuestion', (e) => {
        let id = e.target.name || e.target.classList[2];
        questionDetails.splice(id, 1);
        Swal.fire("Successfully deleted!", "", "success");
        showQuestionTable(questionDetails);
    })


    //close the edit form for the question
    $("body").on('click', '.closeForm', () => {
        $("#editQuestionForm").toggle();
    })

    //this will close the exam
    $('#closeExamForm').click(() => {
        if (confirm("Do you really want to cancel exam creation?")) {
            $("#createExamForm").hide();
            let ids = [
                "questionMultiple",
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
            questionDetails = [];
            $("#content").show();

        }
    });

    //this function will show the form create exam
    $('body').on('click', '.createExam', () => {
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
    $("body").on('click', '.examsBtn', () => {
        if (isTeacher) {
            retrieveExamsByStatusAndId(userId, "unactivated");
        } else {
            // call a function here
            getJoinedExam(userId, "activated");
        }
        $(".examsBtn").addClass("dashMenuActive");
        $(".activeExamBtn").removeClass("dashMenuActive");
        $(".expiredExamBtn").removeClass("dashMenuActive");
        $(".settings").removeClass("dashMenuActive");
    });

    //this method will get the active exams
    $("#sideb").on('click', '.activeExamBtn', () => {

        if (isTeacher) {
            $("#noExam1").show();
            retrieveExamsByStatusAndId(userId, "activated");
        } else {
            getJoinedExam(userId, "activated");
        }
        $(".examsBtn").removeClass("dashMenuActive");
        $(".activeExamBtn").addClass("dashMenuActive");
        $(".expiredExamBtn").removeClass("dashMenuActive");
        $(".settings").removeClass("dashMenuActive");
    });

    //this method will get the expired exams
    $("#sideb").on('click', '.expiredExamBtn', () => {
        retrieveExamsByStatusAndId(userId, "deactivate");

        $(".examsBtn").removeClass("dashMenuActive");
        $(".activeExamBtn").removeClass("dashMenuActive");
        $(".expiredExamBtn").addClass("dashMenuActive");
        $(".settings").removeClass("dashMenuActive");

    });

    //this function will get the settig view
    $("#sideb").on('click', '.settings', () => {
        userProfile(userInfo);
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
                    { "A": $("#a").val() },
                    { "B": $("#b").val() },
                    { "C": $("#c").val() },
                    { "D": $("#d").val() }
                ],
                "points": $("#points").val()
            };
            questionDetails.push(data);
            Swal.fire({
                icon: 'success',
                title: 'Successfully added!',
                showConfirmButton: false,
                timer: 1000
            })
            resetFields(ids);
        };
    });


    //submit edidted multiple choice question
    $("body").on('click', '#submitMultiE', () => {
        let ids = [
            "questionMultipleE",
            "correctAnsMultiE",
            "aE",
            "bE",
            "cE",
            "dE"
        ];
        //use validation here
        let errors = AvoidEmpty(ids);

        if (isContainsError(errors)) {
            showErrors(errors);
        } else {
            let data = {
                question: $("#questionMultipleE").val(),
                type: $("#typeMultiE").val(),
                answerKey: $("#correctAnsMultiE").val(),
                choices: [
                    { "A": $("#aE").val() },
                    { "B": $("#bE").val() },
                    { "C": $("#cE").val() },
                    { "D": $("#dE").val() }
                ]
            };
            questionDetails[questionId] = data;
            Swal.fire({
                icon: 'success',
                title: 'Successfully edited!',
                showConfirmButton: false,
                timer: 1000
            })
            $("#editQuestionForm").toggle();
            showQuestionTable(questionDetails);
            resetFields(ids);
        };
    });

    //submits the true or false question
    $('#submitTrue').click(() => {
        let ids = [
            "questionTrue",
            "correctAnsTrue",
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
                ],
                "points": $("#points").val()
            };

            questionDetails.push(data);
            Swal.fire({
                icon: 'success',
                title: 'Successfully added!',
                showConfirmButton: false,
                timer: 1000
            })
            resetFields(ids);
        }

    });

    //edits the true or false question
    $("body").on('click', '#submitTrueE', () => {
        let ids = [
            "questionTrueE",
            "correctAnsTrueE"
        ];
        let errors = AvoidEmpty(ids);

        if (isContainsError(errors)) {
            showErrors(errors);
        } else {
            let data = {
                question: $("#questionTrueE").val(),
                type: $('#typeTrueE').val(),
                answerKey: $("#correctAnsTrueE").val(),
                choices: [
                    "true",
                    "false"
                ]
            };

            questionDetails[questionId] = data;
            Swal.fire({
                icon: 'success',
                title: 'Successfully edited!',
                showConfirmButton: false,
                timer: 1000
            })
            $("#editQuestionForm").toggle();
            showQuestionTable(questionDetails);
            resetFields(ids);
        }
    });

    //submits the identification question
    $("#submitIden").click(() => {
        let ids = [
            "questionIden",
            "correctAnsIden",
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
                choices: null,
                "points": $("#points").val()
            }

            questionDetails.push(data);
            Swal.fire({
                icon: 'success',
                title: 'Successfully added!',
                showConfirmButton: false,
                timer: 1000
            })
            resetFields(ids);
        }
    });

    //edit identification question
    $("body").on('click', '#submitIdenE', () => {
        let ids = [
            "questionIdenE",
            "correctAnsIdenE"
        ];

        //use validation here
        let errors = AvoidEmpty(ids);
        if (isContainsError(errors)) {
            showErrors(errors);
        } else {
            let data = {
                question: $("#questionIdenE").val(),
                type: $('#typeIdenE').val(),
                answerKey: $("#correctAnsIdenE").val(),
                choices: null
            }

            questionDetails[questionId] = data;
            console.log(data);
            alert("question successfully Edited!");
            $("#editQuestionForm").toggle();
            showQuestionTable(questionDetails);
            resetFields(ids);
        }
    });


    //Delete the exam
    $("body").on('click', '.deleteExam', (e) => {
        let examId = e.target.name || e.target.id;

        apiRequest(`/app/delete/exam/${examId}`, 'delete')
            .then((res) => {
                alert("Successfully deleted!")
                retrieveExamsByStatusAndId(userId, "unactivated");
            })
            .catch((error) => {
                console.log(error);
            })
    })

    //submit the exam
    $('#submitCreateExam').click(() => {

        let ids = [
            "title",
            "timeLimit",
            "instruction",
        ];
        if (questionDetails.length <= 0) {
            alert("No Questions Created!");
            return;
        }

        //use validation here
        let errors = AvoidEmpty(ids);
        if (isContainsError(errors)) {
            showErrors(errors);
        } else {
            let data = {
                author: userId,
                title: $('#title').val(),
                timeLimit: $("#timeLimit").val(),
                instruction: $("#instruction").val(),
                code: generateCode()
            }
            data["examSpan"] = $("#examSpan").val() || null;

            //send request to the server 
            //to save exam
            saveExamAndQuestions(data, questionDetails, userId);
            ids.push("examSpan");
            $("#createExamForm").toggle();
            resetFields(ids);
            $("#content").show();
        }
    });

    //this fucntion will activate the exam
    $(".container").on('click', '.activateExam', async (e) => {
        let examId = e.target.name || e.target.id;
        let examCode = $("#examCode").text();
        let currentDate = new Date();

        let updates = {
            "status": "activated"
        };
        await apiRequest(`/app/exam/${examId}`, 'get')
            .then((res) => {
                console.log("I was here!");
                console.log(res.exam.examSpan);
                if (res.exam.examSpan) {
                    console.log(new Date(currentDate.setMinutes(currentDate.getMinutes() + res.exam.examSpan)));
                    updates["expireDate"] = new Date(currentDate.setMinutes(currentDate.getMinutes() + res.exam.examSpan));
                }
                updateExamById(examId, updates)
                    .then((res) => {
                        Swal.fire(`Give the code to your student\nExamcode: ${examCode}`, '', 'info')
                        subscribeTo("exam", client);
                        retrieveExamsByStatusAndId(userId, "activated");
                        checkDeactivationDate(res.update.expireDate, examId);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    })

    //this fucntion will view the exam
    $(".container").on('click', '.viewExam', (e) => {
        let examId = e.target.name || e.target.id;
        console.log(examId);
        //request the exam
        apiRequest(`/app/exam/${examId}`, 'get')
            .then((res) => {
                console.log(res.exam);
                viewUnactivatedExamDetails(res.exam);
            })
            .catch((error) => {
                console.log(error);
            });
    })

    //this function will deactivate the exam
    $("body").on('click', '.deactivateExam', (e) => {
        let examId = e.target.id;
        deactivateExam(examId);
        endExamCheckMinutes();
    })


    //view the exam result 
    $("body").on('click', '.viewExamResult', (e) => {
        let id = e.target.id;
        console.log("test");
        apiRequest(`/app/analytics/${id}`, 'get')
            .then((res) => {
                console.log(res);
                showExamResultGraph(res, id);
            })
            .catch((error) => {
                console.log(error);
            })
    })


    //this funtion will edit the exam
    $(document).on('click', '.editExam', (e) => {
        let examId = e.target.id;
        apiRequest(`/app/exam/${examId}`, 'get')
            .then((res) => {
                editExam(res.exam);
                questionDetails = res.exam.questions;
            })
            .catch((error) => {
                console.log(error);
            })
    })

    $(document).on('click', "#editExamCreated", (e) => {
        let examId = e.target.classList[4];

        let ids = [
            "title",
            "timeLimit",
            "instruction",
        ];
        if (questionDetails.length <= 0) {
            alert("No Questions Created!");
            return;
        }

        //use validation here
        let errors = AvoidEmpty(ids);
        if (isContainsError(errors)) {
            showErrors(errors);
        } else {
            let data = {
                author: userId,
                title: $('#title').val(),
                timeLimit: $("#timeLimit").val(),
                instruction: $("#instruction").val(),
                questions: questionDetails
            }
            data["examSpan"] = $("#examSpan").val() || null;

            updateExamById(examId, data)
                .then((res) => {
                    console.log("This is test", res);
                    ids.push("examSpan");
                    $("#createExamForm").toggle();
                    resetFields(ids);
                    viewUnactivatedExamDetails(res.update);
                    $("#content").show();
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    })

    //view students currently joined the activated exam
    $(document).on('click', ".StudentsJoined",async (e) => {
        let examId = e.target.id;
        let table = `<table class="table table-hover"><thead>
            <tr>
                <td>name</td>
            </tr>           
        </thead>
        <tbody>
        `
        let tableClose = `</tbody></table>`
        await apiRequest(`/app/exam/${examId}`, 'get')
            .then((res) => {
                if(res.exam.students.length <= 0){
                    table += "<tr><td><h4>No students taking the exam yet</h4></td></tr>"
                    return;
                }
                console.log(res);
                for(let student of res.exam.students){
                    table+=`<tr><td>${student.firstname +" "+ student.lastname}</td></tr>`
                }
            })
            .catch((error) => {
                console.log(error);
            })

            table += tableClose;
        Swal.fire({ title: "Students Joined", html: table});
    })


    ////#########STUDENT PART/########### //
    //this is for the student part
    //get the join button exam
    $("body").on('click', '.joinExam', () => {
        $("#joinExamForm").show();
        $("#createExamForm").hide();
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

    //get the exam history for the students
    $("body").on('click', '.examHistory', () => {

        apiRequest(`/app/get/exam-result/${userId}`, 'get')
            .then((res) => {
                $("#content").empty();
                if (res.results.length <= 0) {
                    $("#content").append(`<div class="container text-center h-100 w-100 m-center m-center" id="noExam">
                    <span class="align-middle">
                        <h3 class="text text-secondary" id="noExamMsg">Theres no Exan History yet!</h3>
                    </span>
                </div>`)
                    return;
                }
                res.results.forEach(result => {
                    showStudentExamHistory(result);
                });
            })
            .catch((error) => {
                console.log(error)
            })
    })


    //the student take the quiz
    $("body").on('click', '.takeQuiz', async (e) => {
        let examId = e.target.id;
        let students = [];
        await apiRequest('/app/get/exam-results', "get")
            .then((res) => {
                students = res.result;

            })
            .catch((error) => {
                console.log(error);
            })

        for (student of students) {
            console.log(student.examId);
            if (student.studentId == userId && student.examId == examId) {
                alert("You already take this exam.\nPlease view your result in the Exam Result tab.");
                return;
            }
        }
        apiRequest(`/app/exam/${examId}`, 'get')
            .then((res) => {
                //alert reminders for the students
                Swal.fire({
                    title: "Reminders!",
                    text: "Please don't refresh the page while taking the exam else you need take the exam again!",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Got it!'
                })

                publishTo(`exam/${res.exam.author._id}/${res.exam.code}`, client, JSON.stringify({
                    name: userInfo.firstname + " " + userInfo.lastname,
                    message: "take quiz",
                    examTitle: res.exam.title
                }));
                showExamView(res.exam);
                examLimitTimer(res.exam.timeLimit, res.exam, userInfo);
            })
            .catch((error) => {
                console.log(error);
            })
    });

    //student submit the exam
    $('body').on('click', '.submitExam', async (e) => {
        let examId = e.target.id;
        let questionIds = [];
        let answerkeyWithPoints = [];
        let exam;
        await apiRequest(`/app/exam/${examId}`, "get")
            .then((res) => {
                questionIds = res.exam.questions;
                exam = res.exam;
            })
            .catch((error) => {
                console.log(error);
            })
        let studentAnswers = {};
        if (!validateExamBeforeSubmit(questionIds)) {
            alert("Please answer all questions!");
            return;
        }
        questionIds.forEach(id => {
            studentAnswers[id._id] = $(`input[name="${id._id}"]:checked`).val() || $(`#${id._id}`).val();
            answerkeyWithPoints[id._id] = { correctAns: id.answerKey, points: id.points, question: id.question };
        })
        validateStudentsAns(studentAnswers, answerkeyWithPoints, exam, userInfo);

    })


    //the student wants to view the exam history
    $("body").on('click', '.viewExamHistory', (e) => {
        let examResultId = e.target.id;
        apiRequest(`/app/get/exam-result-by/${examResultId}`, "get")
            .then((res) => {
                showExamSummary(res.result);
            })
            .catch((error) => {
                console.log(error);
            })
    })
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


//this function will retrieve and show the exams
function retrieveExamsByStatusAndId(userId, status) {
    $("#content").empty();
    apiRequest(`/app/get/exam/${status}/${userId}`, "get")
        .then((res) => {
            let view = (status === "unactivated") ? '<span class="align-middle createExam">'
                + '<h5><a href="#" class="btn btn-primary mt-1" id="noExamBtn">Create Exam</a></h5>'
                + '</span>' : "";
            if (res.exams.length <= 0) {
                $("#content").append(`
                <div class="container text-center h-100 w-100 m-center m-center" id="noExam">
                    <span class="align-middle">
                        <h3 class="text text-secondary" id="noExamMsg">Theres no ${status} exam yet!</h3>
                    </span>
                    ${view}
                </div>`);
                $("#noExam1").hide();
            } else {
                showExams(res.exams);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

