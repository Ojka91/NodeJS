const express = require('express')
const hbs = require('hbs')

//We dont know which port heroku will give us. If doesnt exist, (like in local) -> 3000
const port = process.env.PORT || 3000

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

app.listen(port, () => console.log(`Listening port ${port}`))
