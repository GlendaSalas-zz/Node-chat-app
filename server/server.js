//require('./../config/config');

const path = require('path');
const http = require('http');
const publicPath=path.join(__dirname,'../public');
const  express = require('express');
const  socketIO = require('socket.io');
const {generateMessage,generateLocationMessage}= require('./utils/message.js');
const {isRealString}= require('./utils/validation.js');
const {Users}= require('./utils/users.js');
const port=2000;


var app= express();
var server=http.createServer(app);
var io =socketIO(server);
var users= new Users();

app.use(express.static(publicPath));// CONFIGURATION EXPRESS

io.on('connection',(socket)=>{
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} as joined`));
    callback();
  })
  socket.on('createMessage',(message,callback)=>{
    var user= users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
    }
    callback('');
  });
  socket.on('createLocationMessage',(coords)=>{
    var user= users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));
    }

  });
  socket.on('disconnect',()=>{
    var user= users.  removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left the room`));
    }
  });
});
server.listen(port, ()=>{
  console.log(`SERVER PORT ${port}`)
});
