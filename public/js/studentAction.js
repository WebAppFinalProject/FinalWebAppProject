///STUDENTS VIEW FUCNTIONS
//if the student click the submit code
function getAndProcessCode(code, status, userId) {
    console.log(code, status);
    apiRequest(`/app/get/exam/v2/${code}/${status}`, "get")
        .then((res) => {
            console.log(res);
            //update the exam
            let studentsJoined = res.exam.students;
            //check if the students already joined the exam
            if (studentsJoined.includes(userId)) {
                alert("You already joined this exam!");
                return;
            } else {
                studentsJoined.push(userId);
                updateExamById(res.exam._id, { students: studentsJoined })
                    .then((res) => {
                        console.log(res);
                        //show the students joined exams
                        getJoinedExam(userId, "activated");
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        })
        .catch((error) => {
            if (error.responseJSON.message) {
                alert("Exam code is not valid!");
            } else {
                console.log(error);
            }
            $("#joinExamForm").show();
        })
}

//this fucntion will get the exams joined by the student
function getJoinedExam(userId, status) {
    apiRequest(`/app/get/student/exam/${userId}/${status}`,'get')
        .then((res) => {
            $("#content").empty();
            let view = (status === "activated")?'<span class="align-middle joinExam">'
            +'<h5><a href="#" class="btn btn-primary mt-1" id="noExamBtn">Create Exam</a></h5>'
            +'</span>':"";
            if(res.exams.length <= 0){   
                $("#content").append(`
                <div class="container text-center h-100 w-100 m-center m-center" id="noExam">
                    <span class="align-middle">
                        <h3 class="text text-secondary" id="noExamMsg">Theres no ${status} exam yet!</h3>
                    </span>
                    ${view}
                </div>`);
                $("#noExam1").hide();
                $("#noExam").show();
            }else{
                showExams(res.exams, {teacher: "hide",student: ""});
            }
        })
        .catch((error) => {
            alert("Something went wrong!");
            console.log(error);
        })
}


//this function will show the student view dashboard
function studentView() {
    $("#sideb").empty();
    $("#sideb").append(
        `<p class="text-left  p-4 dashMenu dashMenuActive examsBtn"><a href="#">Exams</a></p>
        <p class="text-left  p-4 dashMenu expiredExamBtn"><a href="#">Expired Exams</a></p>
        <p class="text-left  p-4 dashMenu settings"><a href="#">Settings</a></p>`
    );
    $("#create-cont").empty();
    $("#create-cont").append(
        `<span class="mr-2 btn btn-white joinExam"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Join
        Exam</span>`
    );
}
