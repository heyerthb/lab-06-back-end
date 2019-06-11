'use strict';

require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get('/location', (request, response) => {
    try {
        const locationData = searchToLatLong(request.query.data);
        response.send(locationData);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Status: 500. So sorry, something went wrong.');
    }
});

app.get('/weather', (request, response) => {
    try {
        const weatherData = searchWeatherData(request.query.data);
        
        response.send(weatherData);
    }
    catch (error) {
        
        console.error(error);
        

        response.status(500).send('Status: 500. So sorry, something went wrong.');
    }

});

// Helper Functions

// function Location(query, geoData) {
// this.geoData = require('./data/geo.json')
//     this.query= query;
//     this.formatted_query = geoData.formatted_address;
//     this.latitude = geoData.location.lat;
//     this.longitude = geoData.location.lng;
// }
function searchWeatherData(query) {
    const skyData = require('./data/darksky.json')
    const weather = {
        search_query: query,
        time: skyData.daily.data[0].time,
        forecast: skyData.daily.data[0].summary,
        time2: skyData.daily.data[1].time,
        forecast2: skyData.daily.data[1].summary

        
        // latitude: skyData.results[0],
        // longitude: skyData.results[0],
    };
    return weather;
}


function searchToLatLong(query) {
    const geoData = require('./data/geo.json')
    const location = {
        search_query: query,
        formatted_query: geoData.results[0].formatted_address,
        latitude: geoData.results[0].geometry.location.lat,
        longitude: geoData.results[0].geometry.location.lng
    };
    return location;
}

//   const location = new Location(request.query.data, )

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));