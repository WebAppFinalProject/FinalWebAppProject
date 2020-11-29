///STUDENTS VIEW FUCNTIONS
//if the student click the submit code
function getAndProcessCode(code, status){
    console.log(code, status);
    apiRequest(`/app/get/exam/v2/${code}/${status}`,"get")
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            if(error.responseJSON.message){
                alert("Exam code is not valid!");
            }else {
                console.log(error);
            }
            $("#joinExamForm").show();
        })
}

//this function will show the student view dashboard
function studentView() {
    $("#sideb").empty();
    $("#sideb").append(
        `<p class="text-left  p-4 dashMenu dashMenuActive" id="examsBtn"><a href="#">Exams</a></p>
        <p class="text-left  p-4 dashMenu" id="expiredExamBtn"><a href="#">Expired Exams</a></p>
        <p class="text-left  p-4 dashMenu" id="settings"><a href="#">Settings</a></p>`
    );
    $("#content").empty();
    $("#content").append(
        `<div class="container text-center h-100 w-100 m-center m-center" id="noExamJoined">
        <span class="align-middle">
            <h3 class="text text-secondary"></h3>
            <h3 class="text text-secondary">Theres no Exams joined yet!</h3>
        </span>
        <span class="align-middle joinExam">
            <h5><a href="#" class="btn btn-primary mt-1 joinExam">Join Exam</a></h5>
        </span>
        </div>`
    );
    $("#create-cont").empty();
    $("#create-cont").append(
        `<span class="mr-2 btn btn-white joinExam"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Join
        Exam</span>`
    );
}