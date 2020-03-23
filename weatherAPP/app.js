const location = require('./places/places')
const weather = require('./weather/weather')

const argv = require('yargs').options({
    location:{
        alias: 'l',
        desc: 'Location',
        demand: true
    }
}).argv

getInfo = async(location) => {

    try{

        const coords = await location.getPlaceLatLong(location)
        const temp = await weather.getWeather(coords.lat, coords.lng)
        return `Weather from ${coords.direction} is ${temp}`
    } catch{
        return `Cannot get position from ${location}`
    }


}



