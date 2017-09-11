'use strict'

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const multer  = require('multer')
const fs = require('fs')
var Parse = require('csv-parse');

const googleServices = require('./services/googleServices')

const axios = require('axios')
const config = require('./config')

const app = express()
app.use(cors())
const port = process.env.PORT || 3002

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

//geolocationByAddresss
app.get('/api/geolocationByAddresss/:address' , (req, res) => {

  googleServices.geolocationByAddresss(req.params.address)
                .then(function(data){
                  res.status(200).send({data : data})
                })
                .catch(function(err){
                  res.status(200).send({data : err})
                })
})
//geolocationByAddresss

//uploadFiles

const upload = multer({ dest: 'uploads/' })

app.post('/api/uploadFiles' , upload.any() ,  (req,res) => {

  //console.log(req.files[0]);

  var filePath = req.files[0].path;

  const chunks = [];
  fs.createReadStream(filePath)
  .on('data', function(chunk) {
      chunks.push(chunk);
  })
  .on("end", function () {
    let results = Buffer.concat(chunks).toString().split('\n')
    console.log(results.filter(function(n){ return n != undefined && n != '' }))

    let promises = []

    for(let i=0;i<results.length;i++){
      if(results[i] != ""){

        promises.push(googleServices.geolocationByAddresss(results[i]))

      }
    }

    Promise.all(promises).then(function(responses){
        res.status(200).send({results : responses})
    }), function(err){
        res.status(404).send({results : responses})
    }


  })

  });

//uploadFiles


app.get('/' , (req, res) => {
  res.status(200).send({message : 'Welcome to merca-challenge-api2'})
})


app.listen(port, () => {
  console.log(`API REST running in http://localhost:${port}`)
})
