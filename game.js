
let buttonColors =["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClicked = [];
let level = 0;
let started = false;
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(name){
    
    $("#"+name).addClass("pressed");

    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100);
    
}
function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    let randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);

    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}
function startOver(){
    level =0;
    gamePattern =[];
    started =false;
    userClicked =[];
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClicked[currentLevel]){
        if(gamePattern.length===userClicked.length)
        {
            console.log("success");
            setTimeout(function(){
                nextSequence();
                userClicked = [];
            },1000);
        }
        
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
        $("h1").text("Gameover! ,Press any key to Restart");
        console.log("gameover you lose");
        startOver();
    }
}
$(".btn").click(function(){
    let userchosencolor = $(this).attr("id");
    userClicked.push(userchosencolor);
    
    animatePress(userchosencolor);
    playSound(userchosencolor);

    checkAnswer(userClicked.length-1);
});

$(document).on("keypress",function(){
    if(started===false){
        started = true;
        nextSequence();
    }
    else{
        return;
    }
       
})