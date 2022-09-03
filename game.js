var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    new Audio("sounds/" + randomChosenColour + ".mp3").play();
}

$(document).keypress( function() {
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
    }
  );

$(".btn").click( function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    $("#" + name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+ currentColour).removeClass("pressed")
    },100)
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        new Audio("sounds/wrong.mp3").play();
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
        $("body").removeClass("game-over")
        },200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];

}