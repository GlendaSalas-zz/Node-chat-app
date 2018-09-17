var socket= io();
socket.on('connect',function(){
  console.log('conected to server');
});
socket.on('disconnect',function(){
  console.log('Disconnected from server');
});
socket.on('newMessage',function(message){
  console.log('New message',message);
  var li=$('#messages').append('<li>'+message.from+': '+message.text+'</li>');
});



$('#message-form').on('submit', function(e){
  socket.emit('createMessage',{
      from: 'Franke',
      text: $('[name=message]').val()
    },function(){

    })
  e.preventDefault();
});
