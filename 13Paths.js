'use strict'

var http = require('http').createServer(webServer),
    path = require('path'),
    urls = [{
            route: '',
            output: '<h2>Home</h2>',
        },
        {
            route: 'about',
            output: '<h2>About</h2>',
        },
        {
            route: 'contact',
            output: '<h2>Contact</h2>',
        }
    ]

function webServer(req, res) {
    var message = '<h1>Hi there</h1>',
        pathUrl = path.basename(req.url)

    console.log(pathUrl)

    urls.forEach(function (pos){
        if(pos.route == pathUrl){
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(message + pos.output)
        }
    })
    if(!res.finished){
        res.writeHead(404, {'Content-Type':'text/html'})
        res.end('<h4>Err not found</h4>')
    }
}

http.listen(3000)

console.log("Server running...")