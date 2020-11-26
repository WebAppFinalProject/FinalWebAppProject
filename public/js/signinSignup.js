$(document).ready(() => {
    let startingPoint = 1;
    let clickCounter = 0;
    showSlide(startingPoint);
    $('#next').click(() => {
        startingPoint = incrementIndex(1, startingPoint);
        showSlide(startingPoint);
        if (startingPoint > 1) {
            $("#prev").css("display", "block");
        }
        if (startingPoint == 3) {
            $("#next").text("register");
            $("#next").attr("id", "register");
            clickCounter = 1;
        }
        if (startingPoint > 3) {
            startingPoint = 3;
        }
    });



    $('#prev').click(() => {
        startingPoint = incrementIndex(-1, startingPoint);
        showSlide(startingPoint);
        if (startingPoint <= 1) {
            $("#prev").css("display", "none");
        }
        if (startingPoint < 3) {
            $("#register").text("next");
            $("#register").attr("id", "next");
        }
    });



    //this will register the user
    $(".sub").on('click', "#register", () => {
        showSlide(startingPoint);
        if (clickCounter > 1) {
            let ids = [
                "firstname",
                "lastname",
                "email",
                "password"
            ];
            //validate here
            if (ValidateEmail("email")) {
                let errors = AvoidEmpty(ids);
                console.log(errors);
                if (isContainsError(errors)) {
                    showErrors(errors);
                    alert("Please supply the needed Informatiom!");
                } else {
                    let data = {
                        firstname: $("#firstname").val(),
                        lastname: $("#lastname").val(),
                        email: $("#email").val(),
                        password: $("#password").val(),
                        position: $("#position").val()
                    };
                    apiRequest("/user/signup", "post", data)
                        .then((res) => {        
                            window.location.href = res.url;
                            console.log(res);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    startingPoint = 3;
                }
            }else{
                $("#email").css({"border": "solid 2px red"});
                $("#email").attr("placeholder","Invalid Email");
            }
        
        } else {
            clickCounter++;
        }
    })





    // this will signin the user
    $("#signin").click(() => {
        let ids = [
            "emailSignin",
            "passwordSignin"
        ];
        //validate here
        if (ValidateEmail("emailSignin")) {
            let errors = AvoidEmpty(ids);
            //check errors
            
            if (isContainsError(errors)) {
                showErrors(errors);
            } else {
                //if no errors
                let data = {
                    email: $("#emailSignin").val(),
                    password: $("#passwordSignin").val()
                };
                apiRequest("/user/signin", "post", data)
                    .then((res) => {
                        console.log(res);
                        localStorage.setItem("token", res.token);
                        window.location.href = res.url;
                    })
                    .catch((error) => {
                        console.log(error);
                        if(error.responseJSON.message){
                            alert(error.responseJSON.message);
                        }
                    })
            }
        }else {
            $("#emailSignin").css({"border":"solid 2px red"});
            $("#emailSignin").attr("placeholder","Invalid Email Address");
        }
    });
});

function incrementIndex(n, startingPoint) {
    return startingPoint + n;
}

function showSlide(n) {
    let slides = $(".slides");
    let counter = 1;

    for (slide of slides) {
        if (counter == n) {
            slide.style = "display: block";
        } else {
            slide.style = "display: none";
        }
        counter++;
    }
}