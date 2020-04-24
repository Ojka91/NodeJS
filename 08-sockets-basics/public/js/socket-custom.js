
  var socket = io();
  //on = listen
  socket.on('connect', function(){
      console.log('Conectado al servidor')
  })

  socket.on('disconnect', function() {
      console.log('Desconectado del servidor')
  })

  socket.on('enviarMensaje', function (mensaje){
      console.log(mensaje)
  })

  //emit envia informacion
  socket.emit('enviarMensaje', {  
      usuario: 'Oscar',
      msg: 'Wasasp'
  }, function(resp){
      console.log(resp)
  })