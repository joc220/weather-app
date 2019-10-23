const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlbars location and views engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Static directory setup
app.use(express.static(publicDirectoryPath))

//home 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather Sense', 
        name: "Jose M Chavez"
    })
})

//about 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'Jose M Chavez'
    })
})

//help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'You reached the help page!', 
        message: 'You need to call support for more details!!!'
    })
})

//weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must provide an address!"
        })
    } 

    geocode(req.query.address, (error,{ latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData, 
                location, 
                address: req.query.address
            })
        })
    })
})


//help
app.get('/help/*', (req, res) =>{
    res.render('404')
})

//404 
app.get('*', (req, res) => {
    res.render('404')
})


//server
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})