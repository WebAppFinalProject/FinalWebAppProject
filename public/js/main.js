const apiRequest = (url, method, data = null) => {
    return new Promise((resolve, reject) => {
        const ajaxConfig = {
            url: url,
            type: method,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            success: (result) => {
                resolve(result);
            },
            error: (error) => {
                reject(error);
            }
        }

        if (method.toLowerCase() != "get") {
            ajaxConfig["data"] = data;
        }

        $.ajax(ajaxConfig);
    });
}


//validation for forms
//validate email
//make sure all fields are not empty

function ValidateEmail(emailId) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!$(`#${emailId}`).val().match(mailformat)) {
        alert("You have entered an invalid email address!");
        return false;
    }
    return true;
}

function AvoidEmpty(ids){
    let errors = {};
    for(let id of ids){
        if($(`#${id}`).val() == ""){
            errors[id] = `This field should not be empty!`;
        }
    }
    return errors;
}

function resetFields(ids) {
    for(let id of ids){
        $(`#${id}`).val("");
    }
}

function isContainsError(errors){
    for(let key in errors){
        if(errors[key]){
            alert("Please supply all fields!");
            return true;
        }
    }
    return false;
}


function showErrors(errors){
    for(let key in errors){
        $(`#${key}`).attr("placeholder",errors[key])
            .css({"border": "solid 2px red"});
    }
}

function validateDate(date){
    if(date < 60){
        alert("Exam expiration must be atleast 60 minutes");
    }
}
