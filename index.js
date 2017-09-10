const express = require('express');
//const bodyParser = require('body-parser')
/*
const request = require('request')
const config = require('./config')

const app = express()
const port = process.env.PORT || 3002

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
*/
/*
//geolocationByAddresss
app.get('/api/geolocationByAddresss/:address' , (req, res) => {
  let result = {
    data : [],
    error : ''
  }
  let url = config.servicesInfo.google.geocodingAPI
  let params = {
    address : req.params.address,
    key : config.servicesInfo.google.apiKey
  }
  request({url:url, qs:params}, function(err, response , body) {
    if(err) { console.log(err); result.error = err; return res.status(404).send(result); }
      result.data = JSON.parse(response.body)
      console.log("Get response: " +  body)
      return res.status(200).send(result)
  });
})
//geolocationByAddresss


app.get('/api/hola' , (req, res) => {
  res.status(200).send({message : 'ok'})
})

*/

app.get("/" , function(req , res){
  res.send("Hello from nodejs and express");
});

app.listen(port, function() {
  console.log(`API REST running in http://localhost:${port}`)
});
