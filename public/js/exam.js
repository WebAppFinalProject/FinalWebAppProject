//this function will show the exam view

function showExamView(examDetails) {
    $("#sideb").hide();
    $("#sub-nav").hide();
    $("#content").empty();
    $("#content").append(
        `<div class=" container border bg-info mt-5" id="examCont">
        <div class="container border bg-white mt-5">
            <h2 class="text-center">${examDetails.title}</h2>
            <br>
            <h4>Instruction/s: </h4>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${examDetails.instruction}
            </p>
        </div>
        
        <script type="text/javascript">
            window.onbeforeunload = function() {
                return "Your exam is currently ongoing you should not refresh the page!";
            }
        </script>
    </div>`
    );

    examDetails.questions.forEach(question => {
        if(question.type == "multiplechoice"){
            appendMultipleChoiceQ(question);
        }
        if(question.type == "trueorfalse"){
            appendTrueQ(question)
        }
        if(question.type == "identification") {
            appendIdenQ(question);
        }
    });

    $("#examCont").append('<center><button class="btn btn-blue text-white font-weight-bold mt-4 mb-4 submitExam" >Submit Exam</button></center>')
}

function appendMultipleChoiceQ(questionDetails){
    console.log(questionDetails.choices[1].B);
    $("#examCont").append(
        `<div class="container border bg-white mt-4">
        <h4 class="text-center">Multiple Choice</h4>
        <div class="position-center mb-5">
            <p>${questionDetails.question}</p>
            <div class="container border">
                <label class="form-check-label ml-5 p-2">
                    <input type="radio" class="form-check-input" name="${questionDetails._id}">${questionDetails.choices[0].A}<br>
                    <input type="radio" class="form-check-input" name="${questionDetails._id}">${questionDetails.choices[1].B}<br>
                    <input type="radio" class="form-check-input" name="${questionDetails._id}">${questionDetails.choices[2].C}<br>
                    <input type="radio" class="form-check-input" name="${questionDetails._id}">${questionDetails.choices[3].D}<br>
                </label>
            </div>
        </div>
    </div>`
    );
}

function appendTrueQ(questionDetails){
    $("#examCont").append(
        `  <div class="container border bg-white mt-4">
        <h4 class="text-center">True or False</h4>
        <div class="position-center mb-5">
            <p>${questionDetails.question}</p>
            <div class="container border">
                <label class="form-check-label ml-5 p-2">
                    <input type="radio" class="form-check-input" value="true" name="${questionDetails._id}">True<br>
                    <input type="radio" class="form-check-input" value="false" name="${questionDetails._id}">False<br>
                </label>
            </div>
        </div>
    </div>`
    );
}

function appendIdenQ(questionDetails){
    $("#examCont").append(
        `<div class="container border bg-white mt-4 mb-4">
        <h4 class="text-center">Identification</h4>
        <div class="position-center mb-5">
            <p>${questionDetails.question}</p> <br>
            <div class="container border">
                <label class="form-check-label ml-5 p-2">
                    <input type="text" class="form-control" name="${questionDetails._id}" placeholder="Input your answer here">
                </label>
            </div>
        </div>
    </div>`
    );
}