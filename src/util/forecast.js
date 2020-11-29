const request = require("request")

const forecast = (lattitude,longitude,callback)=>{
    
    const urls='http://api.weatherapi.com/v1/current.json?key=81be687d2d9b44c1bc321614202611&q='+encodeURIComponent(lattitude)+','+encodeURIComponent(longitude)+'&lang=en'
    
    request({url: urls, json: true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather service!",undefined)
        }else if(body.error){
            callback("Unable to find location!",undefined)
        }
        else{
            const current = body.current
            callback(undefined,current.condition.text+". It is currently "+current.temp_c+" degrees out. There is "+current.precip_mm+"% chance of rain")
        }
    })
}

module.exports = forecast