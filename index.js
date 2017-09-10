var express = require("express");
var app = express();

const bodyParser = require('body-parser')
const request = require('request')
const config = require('./config')

const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.get("/" , function(req , res){
  res.send("Hello from nodejs and express");
});

console.log("web application opened");
//app.listen(process.env.PORT || 3003);

app.listen(port, () => {
  console.log(`API REST running in http://localhost:${port}`)
})
