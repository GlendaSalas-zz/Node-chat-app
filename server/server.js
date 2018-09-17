require('./../config/config');

const path = require('path');
const http = require('http');
const publicPath=path.join(__dirname,'../public');
const  express = require('express');
const  socketIO = require('socket.io');

const port=process.env.PORT;


var app= express();
var server=http.createServer(app);
var io =socketIO(server);

app.use(express.static(publicPath));// CONFIGURATION EXPRESS

io.on('connection',(socket)=>{
  console.log('NEW USER CONNECTED');
  socket.emit('newMessage', {
    from : 'Admin',
    text: 'Welcome to the chat app'
  });
  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text:'New user joined',
    createAt:new Date().getTime()
  });
  socket.on('createMessage',(message)=>{
    console.log('Create message',message);
    io.emit('newMessage',{ // EVERY SINGLE PERSON
      from: message.from,
      text:message.text,
      createAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
       from: message.from,
       text:message.text,
       createAt: new Date().getTime()
    });
  });
  socket.on('disconnect',()=>{
    console.log('User disconnect');
  });
});
server.listen(port, ()=>{
  console.log(`SERVER PORT ${port}`)
});
