const axios = require('axios')
const config = require('../config')

var geolocationByAddresss = function(address){

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
          console.log("Get response: " +  result.data)
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
  geolocationByAddresss : geolocationByAddresss
}
