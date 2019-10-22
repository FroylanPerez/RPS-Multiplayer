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
var playerOneGame = false;
var playerTwoGame = false;


$("#startPlayerOne").on("click", function(event) {
    var playerOneReady= true;
    playerOneGame= true;
    playerTwoGame= false;
    database.ref("/players/player1OnLine").set(
        playerOneReady,
    );  
});

$("#startPlayerTwo").on("click", function(event) {
    var playerTwoReady= true;
    // playerTwoGame= true;
    database.ref("/players/player2OnLine").set(
        playerTwoReady,
    );
});

$(".playerChoice1").on("click", function(gameOne) {
    if(playerOneGame===true) {
    var choicePlayer1 = $(this).text();
    console.log(choicePlayer1);
    database.ref("/players/player1OnLine/player1Choice").set(
        choicePlayer1,
    );
    playerOneGame = false;
    playerTwoGame = true;
    }
});

$(".playerChoice2").on("click", function(gameTwo) {
    if(playerTwoGame===true) {
    var choicePlayer2 = $(this).text();
    console.log(choicePlayer2);
    database.ref("/players/player2OnLine/player2Choice").set(
        choicePlayer2,
    );
    playerOneGame = true;
    playerTwoGame = false;
    }
});

database.ref("/players").on("value", function(snapshot) {
    if (snapshot.child("player1OnLine").exists() && snapshot.child("player2OnLine").exists()) {
        console.log("ok");
    }
});


$("#send").on('click', function(){
    var message = $("#message").val();  
    console.log(message);  
    database.ref("messages").push({
        message: message
    });
    $('#message').val('');
    // $('#chat').append("<p>"+data.val().message+"</p><br>");
});

database.ref("messages").on("child_added", function(data){
    console.log(data.val());
    $('#chat').append("<p>"+data.val().message+"</p><br>");
});

$("#remove").on("click", function(){
    database.ref("messages").remove();
    $("#chat").empty();
});