function userProfile(userInfo, pos) {
    $("#content").empty();
    $("#content").append(
        `<div class=" container   bg-white mt-1">
        <div class="container border bg-info mt-3 p-5">
            <h1 class="p-5 text-white font-weight-bold text-center">Teacher Name <i
                    class="fas fa-chalkboard-teacher"></i></h1>
        </div>

        <div class="container border bg-info mt-3 mb-3">
            <div class="row m-4">
                <div class="card ml-2" style="width: 30rem;">
                    <div class="card-body ">
                        <h5 class="text-center">
                            Number of Exams Created
                        </h5>
                    </div>
                </div>
                <div class="card ml-5 " style="width: 30rem;">
                    <div class="card-body ">
                        <h5 class="text-center">
                            Average
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="container border bg-info mt-3 mb-3 ">
            <h3 class="mt-2 text-center text-white font-weight-bold">List of Exam ${pos}}</h3>
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