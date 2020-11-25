$(document).ready(()=>{
    //this function will show the form create exam
    $('.createExam').click(()=>{
        $('#modalExamForm').toggle();
    })

    //this method will toggle the 
    //side bar of the dashboard
    $('#showMenu').click(()=>{
        $("#sideb").toggle();
    });
})