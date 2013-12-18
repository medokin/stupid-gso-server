var cache = require('memory-cache');
var request = require('request');
var RSVP = require('rsvp');

module.exports = function(url, cachetime){
  var value = cache.get(url);
  var promise = new RSVP.Promise(function(resolve, reject){
    if(value != null){
      resolve(value);
    }else{
      request({url: url, timeout: 3000}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          cache.put(url, body, cachetime);
          resolve(body);
        }else{
          reject('Request error: '+ error + ' URL: ' + url);
        }
      });        
    }
  });
    
  return promise;
}
