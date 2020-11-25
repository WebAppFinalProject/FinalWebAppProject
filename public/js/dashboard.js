$(document).ready(()=>{
    //this function will show the form create exam
    $('.createExam').click(()=>{
        $('#createExamForm').show();
    })

    $('#closeModal').click(()=>{
        $('#createExamForm').hide();
    });
    //this method will toggle the 
    //side bar of the dashboard
    $('#showMenu').click(()=>{
        $("#sideb").toggle();
    });
})