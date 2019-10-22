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
// var playerChoiceJS1;  -- Aqui dejar una sola variable para evaluar el turno del jugador
// var playerOneConected = database.ref();
// var playerTwoConected = database.ref();
// var playerOneDataBase = firebase.database("/player1Conected");
// var connectedPlayerRef = database.ref(".info/connected");
var playersOnLine = database.ref("/playersOnLine");
var connectedPlayersRef = database.ref(".info/connected");

connectedPlayersRef.on("value", function(snapshot) {
    playersOnLine = database.ref("/playersOnLine").numChildren();
    if (snapshot.val()) {
        var con = database.ref("/playersOnLine").push(
            playersOnLine
        );
        con.onDisconnect().remove();
        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
        $("#playersOnLine").text(playersOnLine);
        console.log(snapshot.val());
        
    }
  });
  
//   connectedPlayersRef.on("value", function(snapshot) {
//     playersOnLine = database.ref("/playersOnLine").numChildren();
//     if (snap.val()) {
snapshot.val().length;
//         var con = connectionsRef.push(true);
//         con.onDisconnect().remove();
//       }
//       });

  
$(".playerChoice1").on("click", function(event) {
    // var rock = 1;
    // var paper = 2;
    // var scissors = 3;  // Pensaba evaluar en base a sus valores, pero no recuerdo como era la función del % para evaluar el valor remanente
    var choicePlayer1 = $(this).text();
    console.log(choicePlayer1);
    database.ref("/playerChoice1").set(
        choicePlayer1,
    );

});

$(".playerChoice2").on("click", function(event) {
    var choicePlayer2 = $(this).text();
    console.log(choicePlayer2);
    database.ref("/playerChoice2").set(
        choicePlayer2,
    );

});





database.ref("/playerChoice1").on("value", function(snapshot) {
    console.log(snapshot.val());
    // if (snapshot.child("player1Choice").exists()) {
  
    //   var playerChoiceJS1 = snapshot.val().player1Choice;
    //   var playerChoiceJS2 = snapshot.val().player2Choice;
  
    //   $("#playerChoice1Display").text(playerChoiceJS1);
    //   $("#playerChoice2Display").text(playerChoiceJS2);
  
    //   console.log(playerChoiceJS1);
    //   console.log(snapshot.val().player1Choice);
    //   console.log(playerChoiceJS2);
    //   }
});