const path = require('path');
const express = require('express');
const hbs = require('hbs');
const {geocode, weather} = require('./utils/forecast');

const app = express();

//Definition for app root and views directory
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Setup for views engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bright Arhin'
    })
});

//About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bright Arhin'
    })
});

//help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'How may I help you',
        name : 'Bright Arhin'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({error : 'No address provided'})
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {})=> {
        if(error){
            return res.send({Error : error})
        }
            weather(longitude, latitude, (error, {temperature, summary})=>{
                if(error){
                    return res.send({Error : error})
                }else{
                    res.send({
                      forecast :  `The temperature is ${temperature} and it is ${summary}`,
                      location :  location
                    });
                }
            })
    });
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title : '404',
        error_message : 'Help  article Not Found',
        name: 'Bright Arhin'
    });
});

app.get('*', (req, res)=>{
   res.render('404', {
       title :'404',
       error_message : 'Page Not Found',
       name: 'Bright Arhin'
   });
});

app.listen(3000, () => {
    console.log('The server has started')
});