

/**
 * This function validate the exam if the 
 * student fills up the exam correctly
 * @param {*} questionIds 
 */
function validateExamBeforeSubmit(questionIds){
    console.log(questionIds);
    let isValid = true;
    questionIds.forEach(id => {
        let ans = $(`input[name="${id._id}"]:checked`).val() || $(`#${id._id}`).val();
        if(!ans){
            isValid = false;
            return isValid;
        }
    });
    return isValid;
}

/**
 * This function will validate the exam and count the 
 * check item and total the score of the student
 * 
 * this function will take students answers and the aswer key of the students
 * @param {*} studentAns 
 * @param {*} examNaswerKey 
 */
function validateStudentsAns(studentAns, examaswerKeyWithPoints, examId, userId){
    let total = 0;
    let studentScore = 0;

    for(let id in studentAns){
        total += examaswerKeyWithPoints[id].points;
        if(studentAns[id].toLowerCase() === examaswerKeyWithPoints[id].correctAns.toLowerCase()){
            studentScore += examaswerKeyWithPoints[id].points;
        }
    }
    let data = {
        examId: examId,
        studentId: userId,
        studentScore: studentScore,
        studentAnswer: studentAns,
        totalScore: total
    };

    apiRequest(`/app/add/exam-result`,'post',data)
        .then((res)=>{
            console.log(res);
            showExamOverview(total, studentScore, res.result._id);            
        })
        .catch((error)=>{
            console.log(error);
        })
}

/**
 * This function will display the exam 
 * questions and test
 * @param {*} examDetails 
 */
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

    $("#examCont").append(`<center><button class="btn btn-blue text-white font-weight-bold mt-4 mb-4 submitExam" id="${examDetails._id}" >Submit Exam</button></center>`)
}
/**
 * This function will append the multiple choice exam 
 * @param {*} questionDetails 
 */
function appendMultipleChoiceQ(questionDetails){
    console.log(questionDetails.choices[1].B);
    $("#examCont").append(
        `<div class="container border bg-white mt-4">
        <h4 class="text-center">Multiple Choice</h4>
        <div class="position-center mb-5">
            <p>${questionDetails.question}</p>
            <p class="text-right text-secondary">${questionDetails.points} point/s</p>
            <div class="container border">
                <label class="form-check-label ml-5 p-2">
                    <input type="radio" class="form-check-input" name="${questionDetails._id}" value="A">${questionDetails.choices[0].A}<br>
                    <input type="radio" class="form-check-input" name="${questionDetails._id}" value="B">${questionDetails.choices[1].B}<br>
                    <input type="radio" class="form-check-input" name="${questionDetails._id}" value="C">${questionDetails.choices[2].C}<br>
                    <input type="radio" class="form-check-input" name="${questionDetails._id}" value="D">${questionDetails.choices[3].D}<br>
                </label>
            </div>
        </div>
    </div>`
    );
}

/**
 * This function will display the true or false exam
 * @param {*} questionDetails 
 */
function appendTrueQ(questionDetails){
    $("#examCont").append(
        `  <div class="container border bg-white mt-4">
        <h4 class="text-center">True or False</h4>
        <div class="position-center mb-5">
            <p>${questionDetails.question}</p>
            <p class="text-right text-secondary">${questionDetails.points} point/s</p>
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

/**
 * This function will display the identification exam
 * @param {*} questionDetails 
 */
function appendIdenQ(questionDetails){
    $("#examCont").append(
        `<div class="container border bg-white mt-4 mb-4">
        <h4 class="text-center">Identification</h4>
        <div class="position-center mb-5">
            <p>${questionDetails.question}</p>
            <p class="text-right text-secondary">${questionDetails.points} point/s</p> 
            <br>
            <div class="container border">
                <label class="form-check-label ml-5 p-2">
                    <input type="text" class="form-control" id="${questionDetails._id}" placeholder="Input your answer here">
                </label>
            </div>
        </div>
    </div>`
    );
}