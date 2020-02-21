const request = require('request');




const geocode = (address, callback)=> {
    const apiKey = 'pk.eyJ1IjoiYnJpZ2h0YXJoaW4iLCJhIjoiY2s2cTZqNXRiMWplbTNmcXNyOXJieHhwayJ9.uQdvWlds-sdsmfaX9-pe9g';
    const encodedAddress = encodeURI(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${apiKey}&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};




const weather = (longitude, latitude, callback)=> {
    const url = `https://api.darksky.net/forecast/11827610c0412a8747e49d30175034e8/${longitude},${latitude}?units=si`;
    request({url : url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to the server',undefined)
        }else if (response.body.error) {
            callback('Unable to find location', undefined)
        }else {
            const data = response.body.currently;
            callback(undefined, data);
        }

    })
};


module.exports = {
    geocode : geocode,
    weather : weather
};