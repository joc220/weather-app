const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/062b4c09206adeb102ac16425d16e697/"+ encodeURIComponent(latitude) +","+ encodeURIComponent(longitude)

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to get forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to get forecast!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.', {
            })
        }
    })
}

  module.exports = forecast 