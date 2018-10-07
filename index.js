var express = require('express');
var socket = require('socket.io');
// App setup
var app = express();
// create a server and store it in server variable
//
var server = app.listen(4000,function(){
  console.log("listening on port 4000");
});

// static files to sreve something on port
app.use(express.static('public'));

// socket setup on server side   this function takes parameter on what server we want to work on
var io = socket(server);

// then we are going to wait for any connection from client which is done in html file which is going to run in front end
io.on('connection',function(socket){
  // socket parameter in function is unique for different clients
  console.log("made connection");
  
  // socket variable is waiting for any chat messgse and then run this function
  socket.on('chat',function(data){
    // now we are sending this data to all sockets that is to all the clients
    io.sockets.emit('chat',data); //now when we recieve this we have to handle it in forntend to display it in .js file
  });
  
  // now when we type any msg in msg field of msg name typing listener gets on
  socket.on('typing',function(data){
    // now we have to broadcast that msg that means we ahve to send that msg to everyone except that client
    socket.broadcast.emit('typing',data);
  });
})
