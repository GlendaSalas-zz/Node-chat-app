var socket= io();
socket.on('connect',function(){
  console.log('conected to server');
  // socket.emit('createEmail',{
  //   to:'glenda.salas.a@outlook.com',
  //   text:'Hey! this is andrew'
  // })
  socket.emit('createMessage',{
    from:'glenda.salas.a@outlook.com',
    text:'Hey! this is andrew'
  })
  socket.emit('newMessage',{
    from:'glenda.salas.a@outlook.com',
    text:'Hey! this is andrew',
    createAt:12341234
  })
});
socket.on('disconnect',function(){
  console.log('Disconnected from server');
});
socket.on('newEmail',function(email){
  console.log('New email',email);
});
