var username = prompt("Please enter your username:");

//
// function getUserName(){
//   return username;
// }
//

document.title = username + "'s chat";

// var title = document.getElementsByTagName('h1');
// title = "Welcome to the chat, " + username;

$(document).ready(function () {
    $('div.h1anim').fadeIn(1500).removeClass('h1anim');
});

$("#title").text("Welcome to the chat, " + username);

// function setUserName() {
//   var txt;
//   var username = prompt("Please enter your username:");
//   document.getElementById("demo").innerHTML = txt;
// }

var socket = io.connect();
$("form#chat").submit(function(e) {
  e.preventDefault();

var messageText = username + " : " + $(this).find("#msg_text").val();

  socket.emit("send message", messageText, function() {
    $("form#chat #msg_text").val(" ");
  });
});

socket.on("update messages", function(msg) {
  var final_message = $("<p />").text(" " + msg);
  $("#history").append(final_message);
});
