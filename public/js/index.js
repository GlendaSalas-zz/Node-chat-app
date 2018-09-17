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
  var messageTextbox=$('[name=message]');
  socket.emit('createMessage',{
      from: 'Franke',
      text: messageTextbox.val()
    },function(){
      messageTextbox.val("");
    })
  e.preventDefault();
});
var locationButton= $('#send');

locationButton.on('click', function(e){
  if(!navigator.geolocation){
    return alert('GEOLOCATION NOT SUPPORTED BY UR BROWSER.')
  }
  locationButton.attr('disabled','disabled').text('Sending location... ');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(error){
    locationButton.removeAttr('disabled').text('Send location');
    alert('UNABLE TO FETCH LOCATION')
  });
  e.preventDefault();
});
