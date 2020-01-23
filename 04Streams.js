/*
Streams
    Streams of info are sents in Chunks
    EventEmmiter
*/ 

'use strict'

var fs = require('fs'), //require filesystem
    readStream = fs.createReadStream('assets/names.txt'),
    writeStream = fs.createWriteStream('assets/names_copy.txt')

    readStream.pipe(writeStream); //create a copy



    readStream
        .on('data', (chunk) => 
            console.log(
            'Ive read: ', 
            chunk.length,
            'characters'
            )
        )
        .on('end', () => 
        console.log('Finished reading file'))

