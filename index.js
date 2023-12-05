const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

const key = "f7443d67c9d3d41077f52dc2f0c6c383"

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function (req, res) {
    let city = "Moscow"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.floor(parseFloat(data.main.temp)-273.15)
        res.render('form', {
            description: description,
            city: city,
            temp: temp
        })
    })
})

app.post('/', function(req, res) {
    let city = req.body.cityname
    console.log(req.body)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.floor(parseFloat(data.main.temp)-273.15)
        res.render('form', {
            description: description,
            city: city,
            temp: temp
        })
    })
})


app.listen(3005)