var express = require("express");
var app = express();

app.get("/" , function(req , res){
  res.send("Hello from nodejs and express");
});

console.log("web application opened");
app.listen(process.env.PORT || 3003);
