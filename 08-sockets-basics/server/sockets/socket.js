const {io} = require('../server')

io.on('connection', (client) => {
    console.log('Usuario conectado')

    client.emit('enviarMensaje',  {
        usuario: 'Admin',
        msg: 'You are conected loco'
    })

    client.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    //Escuchar client
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log('Servidor', mensaje)

        client.broadcast.emit('enviarMensaje', mensaje)

      /*   if(mensaje.usuario){
            callback({
                res:'everything ok'
            })
        }else{
            callback({
                res:'maaaaal ko'
            })
        } */
        //callback();
    })
})