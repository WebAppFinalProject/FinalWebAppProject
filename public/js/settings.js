
/**
 * This function will show the 
 * Teachers informatiom but not editable
 * @param {*} userInfo 
 */
async function userProfile(userInfo) {
    let exams = [];
    let studentAvg = 0;
    let studentTotal = 0;

    await apiRequest(`/app/get/exam/${userInfo._id}`,"get")
        .then((res)=>{
            exams = res.exams;    
        })
        .catch((error)=>{
            console.log(error);
        })
    $("#content").empty();
    $("#content").append(
        `<div class=" container   bg-white mt-1">
        <div class="container border bg-info mt-3 p-5">
            <h1 class="p-5 text-white font-weight-bold text-center">${userInfo.firstname + " " + userInfo.lastname}<i
                    class="fas fa-chalkboard-teacher"></i></h1>
        </div>

        <div class="container border bg-info mt-3 mb-3">
            <div class="row">
                <div class="col-md-6 p-2">
                    <div class="card">
                        <div class="card-body ">
                            <h5 class="text-center">
                                Number of Exams Created
                            </h5>
                            <h5 class="text-center text-warning" >
                                ${exams.length}
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 p-2">
                    <div class="card">
                        <div class="card-body ">
                            <h5 class="text-center">
                                Average of students joined
                            </h5>
                            <h5 class="text-center text-info" id ="avg">
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container border bg-info mt-3 mb-3 ">
            <h3 class="mt-2 text-center text-white font-weight-bold">List of Exam Created</h3>
            <table class="table table-striped table-white bg-white ">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Exam Title</td>
                        <td>Status</td>
                        <td>No. of students</td>
                    </tr>
                </thead>
                <tbody id="examList">
                </tbody>
            </table>
        </div>
    </div>`
    );
    
    let counter = 1;
    exams.forEach(exam =>{
        $("#examList").append(
            `<tr>
            <th scope="row">${counter}</th>
            <td>${exam.title}</td>
            <td>${exam.status}</td>
            <td>${exam.students.length}</td>
        </tr>`
        );
        studentTotal += exam.students.length;
        counter++;
    })
    console.log(studentTotal);
    studentAvg = studentTotal / exams.length;
    $("#avg").text(studentAvg);
}