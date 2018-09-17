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
  socket.on('disconnect',()=>{
    console.log('User disconnect');
  });
}); // registra un evento
server.listen(port, ()=>{
  console.log(`SERVER PORT ${port}`)
});
