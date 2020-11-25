$(document).ready(() => {
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

    //change the view when the user changes the type of question
    $('#questionType').on('change',()=>{
        let renderedType = $('#questionType').val(); 
        let questionTypes = ["multiple choice","identification","true or false"];
        questionTypes.forEach(type => {
            if(type == renderedType){
                $(`#${renderedType}`).show();
                console.log("sdfgsdf");
            }else{
                $(`#${type}`).hide();
            }
        })
    })

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

    //submit and create Exam Form
    $('#submitCreateExam').click(()=>{
        let title = $("#title").val();
        let expireDate = $("expireDate").val();
        let timeLimit = $("timeLimit").val();
    })
})