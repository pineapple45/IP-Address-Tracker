require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');

//middleware
app.use(express.static(__dirname+'/public'));
app.use(express.json());
// view engine
app.set('view engine', 'ejs');

//PORT 
const PORT = process.env.PORT || 4000;

//IPGeolocation API Key
const geoLocationAPIkey =  process.env.geoLocationAPIkey;

//initialise empty variable from geoDataObj
let geoDataObj = "";
//initialise empty location variable from geoDataObj
let geoDataLocation = "";
//initialise empty ip variable from geoDataObj
let ip = "";

app.get('/',async (req,res) => {
    try{
        if(ip === ""){
            const data = await fetch('https://api.ipify.org/?format=json')
            const ipObj = await data.json();
            ip = ipObj.ip;
        }

        const url = `https://geo.ipify.org/api/v1?apiKey=${geoLocationAPIkey}&ipAddress=${ip}`;
        try{
          const geoData = await fetch(url);
          geoDataObj = await geoData.json();  
    
          const {"ip":ip, "location":location, "isp":isp} = geoDataObj;
          geoDataLocation = location;
          res.render('index',{geoDataObj});

        }catch(err){
            console.log(err);
        }


    }catch(err){
        console.log(err);
        res.json({err});
    }
})


app.post('/postData',(req,res) =>{
    try{
        const data = req.body;
        ip = data.inputVal;
        res.redirect('back');
    }
    catch(err){
        console.log(err);
        res.json({err});
    }
})

app.get('/geoDataLocation',(req,res) => {
    res.json(geoDataLocation);
})


app.listen(PORT,() => console.log(`Listening to ${PORT}...`))