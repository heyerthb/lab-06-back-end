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


function Weather(query, skyData) {
    this.search_query = query;
    this.time = skyData.daily.data[0].time;
    this.forecast = skyData.daily.data[0].summary;
}


function searchWeatherData(query) {
    const skyData = require('./data/darksky.json');
    const weather = new Weather(query, skyData);
    return weather;

}

function Location(query, geoData) {
    this.search_query = query;
    this.formatted_query = geoData.results[0].formatted_address;
    this.latitude = geoData.results[0].geometry.location.lat;
    this.longitude = geoData.results[0].geometry.location.lng;
}

function searchToLatLong(query) {
    const geoData = require('./data/geo.json')
    const location = new Location(query, geoData);
        return location;
    };

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));