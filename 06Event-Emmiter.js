//https://es.wikipedia.org/wiki/Observer_(patr%C3%B3n_de_dise%C3%B1o)

'use strict'

var EventEmitter = require('events').EventEmitter,
    pub = new EventEmitter()

pub.on('myEvent', (msg) => console.log(msg))

pub.once('myEvent', (msg) => console.log('First time' + msg))

pub.emit('myEvent', 'I emmit events')
pub.emit('myEvent', 'Second time')

pub.removeAllListeners('myEvent') //delete listener
pub.emit('myEvent', 'Emitting 3 time') //ofc wont work