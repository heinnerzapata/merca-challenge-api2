'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const axios = require('axios')
const config = require('./config')

const app = express()
const port = process.env.PORT || 3002

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

//geolocationByAddresss
app.get('/api/geolocationByAddresss/:address' , (req, res) => {
  let result = {
    data : [],
    error : ''
  }
  let url = config.servicesInfo.google.geocodingAPI

  axios(url , {
    params : {
      address : 'Kr 19 #1036, Bogotá, Colombia',
      key : config.servicesInfo.google.apiKey
    }
  })
  .then(function(response){
      result.data = response.data
      console.log("Get response: " +  result.data)
      return res.status(200).send(result)

  })
  .catch(function(error){
      console.log(response);
      result.error = error
      return res.status(404).send(result)
  })
})
//geolocationByAddresss

app.get('/api/hola' , (req, res) => {
  res.status(200).send({message : 'ok'})
})


app.listen(port, () => {
  console.log(`API REST running in http://localhost:${port}`)
})
