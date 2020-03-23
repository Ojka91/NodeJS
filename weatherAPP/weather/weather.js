const axios = require('axios')

const getWeather = (lat, lng) => {

        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&${lng}=139&appid=d84c244555530ce003a42fdf67cbd9be&units=metrics`)

        return resp.data.main.temp

    }


module.exports = {

    getWeather
}