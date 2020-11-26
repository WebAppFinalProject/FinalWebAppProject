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

function ValidateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
        alert("Valid email address!");
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        return false;
    }
}

function AvoidEmpty(ids){
    let errors = {};
    for(let id in ids){
        if($(`#${id}`).val() == ""){
            errors[id] = `${id} should not be empty!`;
        }
    }
    return errors;
}

function isContainsError(errors){
    for(let key in errors){
        if(errors[key]){
            return true;
        }
    }
    return false;
}


