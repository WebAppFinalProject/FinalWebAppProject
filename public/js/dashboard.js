$(document).ready(() => {
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
        $("#noExam").toggle();
    })

    //this function will close the modal
    $('#closeModal').click(()=>{
        $('#createExamForm').toggle();
    });
    //this method will toggle the 
    //side bar of the dashboard
    $('#showMenu').click(() => {
        $("#sideb").toggle();
    });
    //////################## Methods To Request from the server ################/////
        //test sample data for the exams
        let ExamData = [
            {
                title: "P.E Exam",
                status: "activates",
                expireDate: "2020-13-12",
                timeLimit: 40, //this should be minutes
            },
            {
                title: "English Exam",
                status: "activates",
                expireDate: "2020-14-12",
                timeLimit: 30, //this should be minutes
            },
            {
                title: "Math Exam",
                status: "activates",
                expireDate: "2020-15-12",
                timeLimit: 10, //this should be minutes
            },
            {
                title: "Filipino Exam",
                status: "activates",
                expireDate: "2020-16-12",
                timeLimit: 50, //this should be minutes
            },
            {
                title: "Science Exam",
                status: "activates",
                expireDate: "2020-17-12",
                timeLimit: 60, //this should be minutes
            },
        ];
        // this is temporary
        //this will display the exams 
        ExamData.forEach(exam => {
            
        })
/**
 * question: {type: String, required: true},
    type: {type: String, enum: ["multiplechoice","trueorfalse","identification"], required: true},
    answerKey: [{type: String, required: true}],
    choices: [{type: String}],
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, default: null} 
 */
        //submit question multiple choice
        $('#submitMulti').click(()=>{
            //test
            let data = {
                question: $("#questionMultiple").val(),
                type: $("#type").val(),
                answerKey: $("#correctAnsMulti").val(),
                choices: [
                    $("#a").val(),
                    $("#b").val(),
                    $("#c").val(),
                    $("#d").val()
                ]
            };

            apiRequest("/add/question", "post", data)
                .then((res)=>{
                    console.log(res);
                })
                .catch((error)=>{
                    console.log(error);
                })
        })
    

})