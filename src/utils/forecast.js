const request = require('request');

const forecast = (latitude, longitude, callback) => {
    console.log("https://api.darksky.net/forecast/342551b65604e6d1f54ee6c8eb844915/" + latitude + "," + longitude + "?units=si")
    const url = "https://api.darksky.net/forecast/342551b65604e6d1f54ee6c8eb844915/" + latitude + "," + longitude + "?units=si";

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback(`Unable to get the weather service!`, undefined)
        } else if (body.error) {
            callback(`Issue while fetching weather`, undefined)
        } else {
            const currentLocationData = body.currently;
            const todayObject = body.daily;
            callback(undefined, {
                result: `${body.daily.data[0].summary} It is currently ${currentLocationData.temperature} degree out. there is ${currentLocationData.precipProbability}% changes of rain`,
                weeklySummary: todayObject.summary,
                maxTemepratue: todayObject['data'][0].temperatureMax,
                minTemepratue: todayObject['data'][0].temperatureMin,
                windSpeed: currentLocationData.windSpeed,
                humidity: currentLocationData.humidity
            })
        }
        // console.log(`${response.body.daily.data[0].summary} It is currently ${currentLocationData.temperature} degree out. there is ${currentLocationData.precipProbability}% changes of rain`)
    })
}

module.exports = forecast;