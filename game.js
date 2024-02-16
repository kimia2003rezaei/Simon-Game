let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
function playSound(chosenColor) {
    var audio = new Audio("sounds/" + chosenColor + ".mp3");
    audio.play()
}
function nextSequence() {
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });

    playSound(randomChosenColor);
    level++;
}
function animatePress (color) {
    $(color).addClass("pressed");
    setTimeout(function () {
        $(color).removeClass("pressed");
    }, 100);
}
function startOver () {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}
function checkAnswer () {
    if (userClickedPattern.length === gamePattern.length){
        let correct = true;
        for (let i = 0; i < userClickedPattern.length; i++) {
            if (gamePattern[i] !== userClickedPattern[i]) {
                correct = false;
            }
        }
        if (correct) {
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
        else {
            console.log(gamePattern);
            console.log(userClickedPattern);
            $("h1").text("Game over at level " + level + ", press any key to restart");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {$("body").removeClass("game-over")}, 200);
            startOver();
        }
    }
}
function clickHandler (buttonObject) {
    animatePress(buttonObject.target)
    let buttonId = buttonObject.target.id
    userClickedPattern.push(buttonId);
    playSound(buttonId);
    checkAnswer();
}
function listen() {
    for (let i = 0; i < buttonColors.length; i++) {
        $("#" + buttonColors[i]).on("click", clickHandler);
    }

}
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
listen();
