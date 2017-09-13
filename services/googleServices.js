const axios = require('axios')
const config = require('../config')

var geolocationByAddresss = function(address){

  address = address

  return new Promise(

    function (resolve , reject){

      let result = {
        data : [],
        error : ''
      }

      let url = config.servicesInfo.google.geocodingAPI

      axios(url , {
        params : {
          address : address,
          key : config.servicesInfo.google.apiKey
        }
      })
      .then(function(response){
          result.data = {
            formatted_address : response.data.results[0].formatted_address,
            location : {
              lat : response.data.results[0].geometry.location.lat,
              lng : response.data.results[0].geometry.location.lng,
            }
          }
          console.log(encodeURIComponent(address))
          console.log("Get response: " +  response.data.results[0].formatted_address)
          resolve(result);
      })
      .catch(function(error){
          console.log(response);
          result.error = error
           reject(result)
      })

    }

  );

}
var getDistanceTwoPoints = function(address1,address2){
  return new Promise(

    function (resolve , reject){

      let result = {
        data : [],
        error : ''
      }

      let url = config.servicesInfo.google.directionsAPI
      console.log(address1)
      console.log(address2)


      axios(url , {
        params : {
          origin : address1,
          destination : address2,
          key : config.servicesInfo.google.apiKey,
          mode : 'driving'
        }
      })
      .then(function(response){
          result.data = {
            route : response.data.routes[0]
          }
          console.log("Get response: " + response.data)
          //console.log("Get response: " +  response.data.results[0].formatted_address)
          resolve(result);
      })
      .catch(function(error){
          console.log(response);
          result.error = error
          reject(result)
      })

    }

  );
}

module.exports = {
  geolocationByAddresss : geolocationByAddresss,
  getDistanceTwoPoints : getDistanceTwoPoints
}
