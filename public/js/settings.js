
/**
 * This function will show the 
 * Teachers informatiom but not editable
 * @param {*} userInfo 
 */
async function userProfile(userInfo) {
    let exams = [];
    await apiRequest(`/app/get/exam/${userInfo._id}`,"get")
        .then((res)=>{
            console.log(res);    
        })
        .catch((error)=>{
            console.log(error);
        })
    $("#content").empty();
    $("#content").append(
        `<div class=" container   bg-white mt-1">
        <div class="container border bg-info mt-3 p-5">
            <h1 class="p-5 text-white font-weight-bold text-center">Teacher Name <i
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
                        </div>
                    </div>
                </div>
                <div class="col-md-6 p-2">
                    <div class="card">
                        <div class="card-body ">
                            <h5 class="text-center">
                                Average
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container border bg-info mt-3 mb-3 ">
            <h3 class="mt-2 text-center text-white font-weight-bold">List of Exam Created</h3>
            <table class="table table-striped table-white bg-white ">
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Brain test</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Brain test</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
    );
}