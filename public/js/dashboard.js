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

    //this function will show the form create exam
    $('.createExam').click(()=>{
        $('#createExamForm').show();
    })

    $('#closeModal').click(()=>{
        $('#createExamForm').hide();
    });
    //this method will toggle the 
    //side bar of the dashboard
    $('#showMenu').click(() => {
        $("#sideb").toggle();
    });
})