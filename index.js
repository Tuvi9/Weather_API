const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const key = 'f7443d67c9d3d41077f52dc2f0c6c383';

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
         .then(response => {
            return response.json()
         })
         .then (data => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            let result = {
                description: description,
                city: city,
                temp: temp
            }
            resolve(result)
        })
         .catch(error => {
            reject(error)
        })
    })
}


/* {.get & .post seperately}
app.get('/', function (req, res) {
    let city = "Tartu"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    getWeatherDataPromise(url)
     .then(data => {
        res.render('form', data)
    })
})

app.post('/', function(req, res) {
    let city = req.body.cityname
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    getWeatherDataPromise(url)
    .then(data => {
        res.render('form', data)
    })
})
*/

app.all('/', function (req, res) {
    let city
    if (req.method == 'GET'){
        city = 'Tartu'
    }
    if (req.method == 'POST') {
        city = req.body.cityname
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    getWeatherDataPromise(url)
    .then(data => {
        res.render('form.ejs', data)
    })
})

app.listen(3005)