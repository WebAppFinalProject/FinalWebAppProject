$(document).ready(() => {
    //global vars
    let questionIds = [];
    let userId = "";

    //chect the user id if present
    if($("#userId").val()){
        const id = $("#userId").val();
        userId = id;
        retirveExamByUserId(id);
        $(".hideIf").hide();

        //request the user by id
        apiRequest('/user/getuser/'+id,"get")
            .then((res)=>{
                $("#username").text(`  ${res.user.firstname} ${res.user.lastname}`);
            })
            .catch((error)=>{
                console.log(error);
            })
    }else{
        $(".showIf").hide();
    }
    

    $("#1").show();
    //change the view when the user changes the type of question
    $("#multiplechoice").click((e)=>{
        e.preventDefault();
        $("#1").show();
        $("#2").hide();
        $("#3").hide();
    });
    $("#trueorfalse").click((e)=>{
        e.preventDefault();
        $("#1").hide();
        $("#2").show();
        $("#3").hide();
    });
    $("#identification").click((e)=>{
        e.preventDefault();
        $("#1").hide();
        $("#2").hide();
        $("#3").show();
    });


    //this will show the question form
    $('#addQuestion').click(()=>{
        $('#formQuestion').toggle();
    })

    //this function will show the form create exam
    $('.createExam').click(()=>{
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
        $('#submitMulti').click(()=>{
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

            apiRequest("/app/add/question", "post", data)
                .then((res)=>{
                    alert(res.message);
                    questionIds.push(res.questionId);
                })
                .catch((error)=>{
                    console.log(error);
                })
        });

        //submits the true or false question
        $('#submitTrue').click(()=>{
            let ids = [
                "questionTrue",
                "correctAnsTrue"
            ];
            //use validation here
            let data = {
                question: $("#questionTrue").val(),
                type: $('#typeTrue').val(),
                answerKey: $("#correctAnsTrue").val(),
                choices: [
                    "true",
                    "false"
                ]
            };
            //send it to the server
            apiRequest('/app/add/question',"post", data)
                .then((res)=>{
                    alert(res.message);
                    questionIds.push(res.questionId);
                })
                .catch((error)=>{
                    console.log(error);
                });
        });

        //submits the identification question
        $("#submitIden").click(()=>{
            let ids = [
                "questionIden",
                "correctAnsIden"
            ];

            //use validation here
            let data = {
                question: $("#questionIden").val(),
                type: $('#typeIden').val(),
                answerKey: $("#correctAnsIden").val(),
                choices: null
            }

            //send it to the server
            apiRequest("/app/add/question","post", data)
                .then((res)=>{
                    alert(res.message);
                    questionIds.push(res.questionId);
                })
                .catch((error)=>{
                    console.log(error);
                });
        });
    
        //submit the exam
        $('#submitCreateExam').click(()=>{
            let ids = [
                "title",
                "expireDate",
                "timeLimit"
            ];
            //use validation here
            let data = {
                author: userId,
                title: $('#title').val(),
                questions: questionIds,
                timeLimit: $("#timeLimit").val(),
                expireDate: $("#expireDate").val(),
            }
            
            //send request to the server 
            //to save exam
            apiRequest("/app/add/exam","post", data)
                .then((res)=>{
                    alert(res.message);
                })
                .catch((error)=>{
                    console.log(error);
                })

        });
})
/**
 * THIS FUNCTION CREATED BY THE DEVELOPERS
 * PLEASE DONT EDIT IT!
 */

 //this fucntion will get all the exam created by the
 //user login
 function retirveExamByUserId(userId) {
     apiRequest(`/app/get/exam/${userId}`,"get")
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
 }