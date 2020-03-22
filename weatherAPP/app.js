const location = require('./places/places')

const argv = require('yargs').options({
    location:{
        alias: 'l',
        desc: 'Location',
        demand: true
    }
}).argv


location.getPlaceLatLong(argv.location)
    .then(console.log)