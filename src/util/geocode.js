const request = require("request")

const geocode = (address,callback)=>{
    
    const geo = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYmhhcmF0aGkxMjk0IiwiYSI6ImNraHllbmlreDA5aHQycXA1bDFiZ3duc3QifQ.2cu7btRbUuwyIxYicjFQzQ"

    request({url:geo,json:true},(error,{body})=>{
        if(error){
            callback("Unable to location serives!",undefined)
        }
        else if(body.features.length==0){
            callback("Unable to find location",undefined)
        }
        else{
            const data = body.features[0].center
            callback(undefined,{
                latitude: data[1],
                longitude: data[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode