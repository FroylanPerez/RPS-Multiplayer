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

$(document).ready(function() {
    database.ref("players").remove();

});

$("#startPlayerOne").on("click", function(event) {
    playerOneReady= true;
    // var playerOneGame= true;
    database.ref("/players/player1OnLine").set(
        playerOneReady,
    );  
    $("#playerOneDisplay").css("border-color", "green");
    $("#playerOneDisplay").css("color", "green");
    $("#playerTwoDisplay").css("border-color", "red");
    $("#playerTwoDisplay").css("color", "red");
    $(".playerChoice2").css("opacity", "0.25");
});

$("#startPlayerTwo").on("click", function(event) {
    // playerTwoReady= true;
    // playerOneReady = false;
    // var playerTwoGame= true;
    database.ref("/players/player2OnLine").set(
        playerTwoReady,
    );
});

$(".playerChoice1").on("click", function(snap) {
    if(playerOneReady===true) {
    var choicePlayer1 = $(this).text();
    console.log(choicePlayer1);
    database.ref("/players/player1OnLine/player1Choice").set(
        choicePlayer1,
    );
    playerOneReady = false;
    playerTwoReady = true;
    }
});

$(".playerChoice2").on("click", function(snap) {
    if(playerTwoReady===true) {
    var choicePlayer2 = $(this).text();
    console.log(choicePlayer2);
    database.ref("/players/player2OnLine/player2Choice").set(
        choicePlayer2,
    );
    }
});

// database.ref("/players").on("value", function(snapshot) {
//     evaluatePlayerOne = snapshot.val().player1Choice;
//     evaluatePlayerTwo = snapshot.val().player2Choice;
//     console.log(evaluatePlayerOne);
//     console.log(evaluatePlayerTwo);
// });

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