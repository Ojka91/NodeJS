/* 
Buffer
    Strip of bytes
        Sockets
        Streams
        Cryptography
*/

'use strict'

var buf = new Buffer.alloc(100),
    buf2 = new Buffer.alloc(26),
    str = '\u00bd + \u00bc = \u00be';

    buf.write('abcd', 0, 4, 'ascii');

    console.log(
        buf,
        buf.toString('ascii'),
        str,
        str.length,
        Buffer.byteLength(str, 'utf8')
        );

for (var x = 0; x<buf2.length; x++){
    //97 ASCII => A
    buf2[x] = x+97;
}

console.log(buf2.toString('ascii'))
