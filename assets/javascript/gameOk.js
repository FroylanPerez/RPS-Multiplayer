var config = {
    apiKey: "AIzaSyBCcjyuxDQSPDAud-5F26p8J7CFunFwgV4",
    authDomain: "rps-multiplayer-355c5.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-355c5.firebaseio.com",
    projectId: "rps-multiplayer-355c5",
    storageBucket: "rps-multiplayer-355c5.appspot.com",
    messagingSenderId: "871305964903",
    appId: "1:871305964903:web:0d6a093b51a3a86fd993c2",
    measurementId: "G-DMQEYB6Q0M"
};
  
firebase.initializeApp(config);

  
var database = firebase.database();
var playersOnLine = database.ref("/players");
var playerOneReady = false;
var playerTwoReady = false;
var evaluatePlayerOne;
var evaluatePlayerTwo;
var tie = 0;
var winPlayerOne = 0;
var winPlayerTwo = 0;
var losePlayerOne = 0;
var losePlayerTwo = 0;

$(document).ready(function() {
    database.ref("players").remove();
    database.ref("messages").remove();

});

$("#startPlayerOne").on("click", function(event) {
    playerOneReady= true;
    // var playerOneGame= true;
    database.ref("/players/player1OnLine").set(
        playerOneReady,
    );  
    $("#resultPlayer1").empty();
    $("#resultPlayer2").empty();
    database.ref("players/player2OnLine/player2Choice").remove();
    $(".playerChoice1").css('visibility', 'hidden');

    // $("#playerOneDisplay").css("border-color", "green");
    // $("#playerOneDisplay").css("color", "green");
    // $("#playerTwoDisplay").css("border-color", "red");
    // $("#playerTwoDisplay").css("color", "red");
    // $(".playerChoice2").css("opacity", "0.25");
});

$("#startPlayerTwo").on("click", function(event) {
    playerTwoReady= true;
    // playerOneReady = false;
    // var playerTwoGame= true;
    database.ref("/players/player2OnLine").set(
        playerTwoReady,
    );
    $("#resultPlayer1").empty();
    $("#resultPlayer2").empty();
    database.ref("players/player1OnLine/player1Choice").remove();
    $(".playerChoice2").css('visibility', 'hidden');

});

$(".playerChoice1").on("click", function(snap) {
    // $("#resultPlayer1").text("WAIT FOR YOUR OPONENT");
    // $("#resultPlayer2").text("CHOOSE AGAIN");
    if(playerOneReady===true) {
    var choicePlayer1 = $(this).text();
    console.log(choicePlayer1);
    database.ref("/players/player1OnLine/player1Choice").set(
        choicePlayer1,
    );
    playerOneReady = false;      //ojo
    }
    // playerTwoReady = true;
});

$(".playerChoice2").on("click", function(snap) {
    if(playerTwoReady===true) {
    var choicePlayer2 = $(this).text();
    console.log(choicePlayer2);
    database.ref("/players/player2OnLine/player2Choice").set(
        choicePlayer2,
    );
    playerTwoReady = false;       //ojo
    }
});

database.ref("/players").on("value", function(snapshot) {
    if (snapshot.child("player1OnLine").exists() && snapshot.child("player2OnLine").exists()) {
    // if(snapshot.val()) {
    evaluatePlayerOne = snapshot.val().player1OnLine.player1Choice;
    evaluatePlayerTwo = snapshot.val().player2OnLine.player2Choice;
    console.log("eleccion jugador 1",snapshot.val());
    console.log("eleccion jugador 2", evaluatePlayerTwo);
    $(".playerChoice1").css('visibility', 'visible');
    $(".playerChoice2").css('visibility', 'visible');
    } 
    if (snapshot.child("player1OnLine/player1Choice").exists() && snapshot.child("player2OnLine/player2Choice").exists()) {
        $(".playerChoice1").css('visibility', 'hidden');
        $(".playerChoice2").css('visibility', 'hidden');
  
        if (evaluatePlayerOne===evaluatePlayerTwo) {
            console.log("Tie");
            tie++;
            $("#resultPlayer1").text("TIE");
            $("#resultPlayer2").text("TIE");
            $("#tieDisplayPlayer1").text(tie);
            $("#tieDisplayPlayer2").text(tie);
        }
        if (evaluatePlayerOne==="Rock" && evaluatePlayerTwo==="Paper") {
            losePlayerOne++;
            winPlayerTwo++;
            $("#resultPlayer1").text("LOSE");
            $("#resultPlayer2").text("WIN");
            $("#loseDisplayPlayer1").text(losePlayerOne);
            $("#winDisplayPlayer2").text(winPlayerTwo);
        }
        if (evaluatePlayerOne==="Rock" && evaluatePlayerTwo==="Scissors") {
            winPlayerOne++;
            losePlayerTwo++;
            $("#resultPlayer1").text("WIN");
            $("#resultPlayer2").text("LOSE");
            $("#winDisplayPlayer1").text(winPlayerOne);
            $("#loseDisplayPlayer2").text(losePlayerTwo);
        }
        if (evaluatePlayerOne==="Paper" && evaluatePlayerTwo==="Rock") {
            winPlayerOne++;
            losePlayerTwo++;
            $("#resultPlayer1").text("WIN");
            $("#resultPlayer2").text("LOSE");
            $("#winDisplayPlayer1").text(winPlayerOne);
            $("#loseDisplayPlayer2").text(losePlayerTwo);
        }
        if (evaluatePlayerOne==="Paper" && evaluatePlayerTwo==="Scissors") {
            losePlayerOne++;
            winPlayerTwo++;
            $("#resultPlayer1").text("LOSE");
            $("#resultPlayer2").text("WIN");
            $("#loseDisplayPlayer1").text(losePlayerOne);
            $("#winDisplayPlayer2").text(winPlayerTwo);
        }
        if (evaluatePlayerOne==="Scissors" && evaluatePlayerTwo==="Rock") {
            losePlayerOne++;
            winPlayerTwo++;
            $("#resultPlayer1").text("LOSE");
            $("#resultPlayer2").text("WIN");
            $("#loseDisplayPlayer1").text(losePlayerOne);
            $("#winDisplayPlayer2").text(winPlayerTwo);
        }
        if (evaluatePlayerOne==="Scissors" && evaluatePlayerTwo==="Paper") {
            winPlayerOne++;
            losePlayerTwo++;
            $("#resultPlayer1").text("WIN");
            $("#resultPlayer2").text("LOSE");
            $("#winDisplayPlayer1").text(winPlayerOne);
            $("#loseDisplayPlayer2").text(losePlayerTwo);
        }

    }
});

// playersOnLine.on("value", function(snap) {
//     var evaluatePlayerOne = database.ref("/players/player1OnLine/player1Choice");
//     var evaluatePlayerTwo = database.ref("/players/player2OnLine/player2Choice");
//     console.log(snap);
//     console.log(snap.val());
//     console.log(evaluatePlayerOne);
// });

// Aqui empieza codigo de chat ----- //
$("#send").on('click', function(){
    var message = $("#message").val();  
    console.log(message);  
    database.ref("messages").push({
        message: message
    });
    $('#message').val('');
});

database.ref("messages").on("child_added", function(data){
    console.log(data.val());
    $('#chat').append("<p>"+data.val().message+"</p><br>");
});

$("#remove").on("click", function(){
    database.ref("messages").remove();
    $("#chat").empty();
});