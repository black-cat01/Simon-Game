var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level;


function playSound(colour) {
    var audio = new Audio("./sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log("User Clicked Pattern: ", userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (checkAnswer(userClickedPattern.length - 1)) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
});

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    // console.log("GAME OVER!!!");
    startOver();


}

function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
}

function nextSequence() {
    ++level;
    $("h1").text("Level " + level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log("Game Pattern: ", gamePattern);

    $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        // console.log("success");
        return true;
    } else {
        // console.log("wrong");
        return false;
    }
}




$(document).on("keydown", function () {
    if (start == false) {
        start = true;
        level = 0;
        nextSequence();
    }
});


