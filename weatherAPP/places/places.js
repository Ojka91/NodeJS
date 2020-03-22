const axios = require('axios')



const getPlaceLatLong = async (location) => {
  
    
    const encoderUrl = encodeURI(location)
    console.log(encoderUrl)
    
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encoderUrl}`,
        headers: {'X-RapidAPI-Key': '585df50292mshb90aeef50448ae8p16a01bjsnc2dc0777e925'}
      });
    
      const response = await instance.get()
           if(response.data.Results.lenght === 0){
               throw new Error(`No results for ${location}`)
           }

    const data = response.data.Results[0];
    const loc = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        loc,
        lat,
        lng
    }

}


module.exports = {
    getPlaceLatLong
}