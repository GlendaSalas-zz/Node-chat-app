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

socket.on('newLocationMessage', function(message){
  var li=$('#messages').append('<li>'+message.from+': <a target="_blank" href="'+message.url+'">My current location</a></li>');

});

$('#message-form').on('submit', function(e){
  socket.emit('createMessage',{
      from: 'Franke',
      text: $('[name=message]').val()
    },function(){

    })
  e.preventDefault();
});
var locationButton= $('#send');
locationButton.on('click', function(e){
  if(!navigator.geolocation){
    return alert('GEOLOCATION NOT SUPPORTED BY UR BROWSER.')
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(error){
    alert('UNABLE TO FETCH LOCATION')
  });
  e.preventDefault();
});
