$(document).ready(() => {
    //global vars
    let questionDetails = [];
    let userId = "";

    //chect the user id if present
    if ($("#userId").val()) {
        const id = $("#userId").val();
        userId = id;
        retirveExamByUserId(id);
        $(".hideIf").hide();

        //request the user by id
        apiRequest('/user/getuser/' + id, "get")
            .then((res) => {
                $("#username").text(`  ${res.user.firstname} ${res.user.lastname}`);
                console.log(res.user);
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

    //this function will show the form create exam
    $('.createExam').click(() => {
        $('#createExamForm').toggle();
        $("#noExam").hide();
    })

    //this method will toggle the 
    //side bar of the dashboard
    $('#showMenu').click(() => {
        $("#sideb").toggle();
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
        
        if(isContainsError(errors)){
            showErrors(errors);
        }else{

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
        };  
    });


    //submits the true or false question
    $('#submitTrue').click(() => {
        let ids = [
            "questionTrue",
            "correctAnsTrue"
        ];
        //use validation here
        let errors = AvoidEmpty(ids);

        if(isContainsError(errors)){
            showErrors(errors);
        }else{
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
        if(isContainsError(errors)){
            showErrors(errors);
        }else{
            let data = {
                question: $("#questionIden").val(),
                type: $('#typeIden').val(),
                answerKey: $("#correctAnsIden").val(),
                choices: null
            }
    
            questionDetails.push(data);
        }
        
    });

    //submit the exam
    $('#submitCreateExam').click(() => {
        let ids = [
            "title",
            "expireDate",
            "timeLimit"
        ];
        //use validation here
        let errors = AvoidEmpty(ids);
        if(isContainsError(errors)){
            showErrors(errors);
        }else{
            let data = {
                author: userId,
                title: $('#title').val(),
                timeLimit: $("#timeLimit").val(),
                expireDate: $("#expireDate").val(),
            }
    
            //send request to the server 
            //to save exam
            saveExamAndQuestions(data, questionDetails);    
        }
        
    });
})

/**
 * DOM MAnipulation functions
 */

//this function will loads the views for 
// a student user
function studentView() {

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
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
}

async function saveExamAndQuestions(Exam, Questions) {
    let questionIds = [];
    for (let question of Questions) {
        //save every question created
        await apiRequest("/app/add/question", "post", question)
            .then((res) => {
                alert(res.message);
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
        })
        .catch((error) => {
            console.log(error);
        })

}