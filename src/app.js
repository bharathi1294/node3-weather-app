const path = require("path")
const express = require("express")
const hbs = require('hbs')
const geocode = require("./util/geocode.js")
const forecast = require("./util/forecast.js")

const app = express()
const port  = process.env.PORT || 3000

//Define paths for express config
const publicdir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdir))

//home page
app.get('',(req,res)=> {
    res.render("index",{
        title:'Weather',
        name:"Bharathi"
    })
})

//about page
app.get("/about",(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Bharathi"
    })
})

//help page
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Bharathi",
        text:"sivabharathi1295@gmail.com"
    })
})


//weather page
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"Yout must provide a address"
        })
    }
        var data_w =" "
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(encodeURIComponent(latitude),encodeURIComponent(longitude),(error,foredata)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:foredata,
                    location:location,
                    address:req.query.address
                })
        
            })
        })
})



//404 page
app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Bharathi",
        error:"Page not found"
    })
})


//server 
app.listen(port,()=>{
    console.log("Server is running on port "+ port)
})