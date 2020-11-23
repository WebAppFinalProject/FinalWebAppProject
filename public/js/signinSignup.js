$(document).ready(()=>{
    let startingPoint = 1;
    let clickCounter = 0;
    showSlide(startingPoint);
    $('#next').click(()=>{
        startingPoint = incrementIndex(1, startingPoint);
        if(startingPoint > 1){
            $("#prev").css("display","block");
        }
        if(startingPoint == 3){
            $("#next").text("submit");
            $("#next").attr("id","submit");
            clickCounter = 1;
        }
        if(startingPoint >3 ){
            startingPoint = 3;
        }else{
            showSlide(startingPoint);
            $("#next").text("next");
            $("#next").attr("id","next");
        }
    });

    $('#prev').click(()=>{
        startingPoint = incrementIndex(-1, startingPoint);
        showSlide(startingPoint);
        if(startingPoint <= 1){
            $("#prev").css("display","none");
        }
    });


    $(".sub").on('click',"#submit",()=>{
        //temporary
        if(clickCounter > 1){
            console.log("The form was submitted!");
        }else{
            clickCounter++;
        }
    })

});

function incrementIndex(n, startingPoint){
    return startingPoint + n;
}

function showSlide(n){
    let slides = $(".slides");
    let counter = 1;
    console.log(n);
    for(slide of slides){
        if(counter == n){
            slide.style = "display: block";
        }else{
            slide.style = "display: none";
        }
        counter++;
    }
}