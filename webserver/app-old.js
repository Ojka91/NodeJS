const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200)
    let out = {
        name: 'Oscar',
        age: 29,
        url: req.url
    }
    res.write(JSON.stringify(out))
    res.end()
})
.listen(3000)


console.log('Server on port 3000')