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

