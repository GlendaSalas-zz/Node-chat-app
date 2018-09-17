var socket= io();
function scrollToBottom(){
  var messages=$('#messages');
  var newMessage=messages.children('li:last-child');
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}
socket.on('connect',function(){
  console.log('conected to server');
});
socket.on('disconnect',function(){
  console.log('Disconnected from server');
});
socket.on('newMessage',function(message){
  var FormattedTime=moment(message.createAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text:message.text,
    from: message.from,
    createAt: FormattedTime
  });
  $('#messages').append(html);
   scrollToBottom();
});

socket.on('newLocationMessage', function(message){
  var FormattedTime=moment(message.createAt).format('h:mm a');
  var template= $('#location-message-template').html();
  var html= Mustache.render(template,{
    url:message.url,
    from: message.from,
    createAt:FormattedTime
  });
  $('#messages').append(html);
   scrollToBottom();
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
