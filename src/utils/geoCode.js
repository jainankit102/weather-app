const request = require('request');

const geoCode = (address, callback) => {

    const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5raXRnZWVrIiwiYSI6ImNqdW81eTQ2ZzB1am80NG11c3d0ZWFwYnUifQ.QUrAodXBn-f42IDB9wemRg';

    request({ url: locationURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to get the geo location service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Issue while fetching location', undefined)

        } else {
            const currentLocationData = response.body;
            const latitueAndLangitude = currentLocationData.features[0].center;
            const latitude = latitueAndLangitude[1];
            const longitude = latitueAndLangitude[0];

            callback(undefined, {
                latitude,
                longitude,
                'location': currentLocationData.features[0].place_name
            })
        }

    })
}

module.exports = geoCode;