const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;
// set up file path
const homeDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set the path and file type for views
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// use static page to serve
app.use(express.static(homeDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Ankit Jain'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ankit Jain'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Ankit Jain'
    })
})


app.get('/weather', (req, res) => {

    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "Please provide the address"
        })
    }

    geoCode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            console.log('Location:', location);
            console.log('Response:', forecastData);

            res.send({
                tempreture: forecastData.result,
                location,
                address,
                latitude,
                longitude,
                daySymmary: forecastData.weeklySummary,
                maxTemepratue: forecastData.maxTemepratue,
                minTemepratue: forecastData.minTemepratue,
                windSpeed: forecastData.windSpeed,
                humidity: forecastData.humidity
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errMsg: 'Help article not found.',
        title: '404',
        name: 'Ankit jain'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errMsg: 'Page not found!',
        title: '404',
        name: 'Ankit jain'
    })
})
// app.send();

app.listen(port, () => {
    console.log('Started a express server');
})