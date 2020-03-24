const express = require('express')
const hbs = require('hbs')

//importa helpers 
require('./hbs/hbs')

const app = express()

app.use(express.static(__dirname+'/public'))

//HBS Engine
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  
    res.render('home',{
        name: 'Oscar lucena',
        year: new Date().getFullYear()
    })
})

app.get('/about', function (req, res) {
    
    res.render('about',{
        name: 'Oscar lucena',
        year: new Date().getFullYear()
    })
})

app.listen(3000, () => console.log('Listening port 3000'))
