var cache = require('memory-cache');
var request = require('request');

module.exports = function(url, cachetime, callback){
    var value = cache.get(url);
    if(value != null){
        callback(value);
    }else{
        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            cache.put(url, body, cachetime);
            callback(body);
          }
        });        
    }
}
