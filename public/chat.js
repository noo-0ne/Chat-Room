// make connection
// io is present in script library
var socket = io.connect('http://localhost:4000');
// query DOM
var message=document.getElementById('message');
var handle = document.getElementById('handle');
 var btn = document.getElementById('send');
 var output = document.getElementById('output');
 var feedback = document.getElementById('feedback');
// on clicking button socket is emmiting data to server and name of messge is chat and other is data object
btn.addEventListener('click',function(){
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  });
});

// evenet listener when someone types a messge
message.addEventListener('keypress',function(){
  socket.emit('typing',handle.value);
});

// listen for data coming through sockets to every client
socket.on('chat',function(data){
  // feedback is done to null string so that whneevre somehas typed a msg then feedback of that person should be removed
  feedback.innerHTML="";
  output.innerHTML+= '<p> <strong>'+ data.handle + ':</strong>' + data.message + '</p>';
});

// listen for coming data through socket to every client of typing
socket.on('typing',function(data){
  feedback.innerHTML = '<p><enm>' + data + ' is typing a message... </enm></p>';
});
