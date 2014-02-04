

module.exports = function (app) {
    var request = require('../lib/helper/request');
    var parser = require('../lib/parser');
    var strPad = require('../lib/helper/strPad');
    var DAY = 86400000;
    
    // Allow Crosssite scripting for every api call
    app.all('/v1/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });   
    
    // GET /types
    // Returns an array of available types
    app.get("/v1/types", function (req, res) {
        res.json(['classes', 'teachers', 'rooms']);
    });
    
    
    // GET /weeks
    // Returns an array with available weeks numbers
    app.get("/v1/weeks", function (req, res) {
        
        request('http://stupid.gso-koeln.de/frames/navbar.htm', DAY).then(function (body) {
            
            parser.weeks.parse(body, function(weeks){
                res.json(weeks);
            });
            
        }, function(error){
          res.send(error, 500);
        });
        
    });
    
    // GET /elements/:type
    // Returns an array with all available elements for given type
    app.get("/v1/elements/:type(teachers|classes|rooms)", function (req, res) {
        
        request('http://stupid.gso-koeln.de/frames/navbar.htm', DAY).then(function (body) {
            
            parser.elements.parse(body, req.params.type, function(elements){
                res.json(elements);
            });
            
        }, function(error){
          res.send(error, 500);
        });
        
    });
    
    // GET /timetable/:type/:element/:week
    // Returns an array of lessons for given type, element and week
    app.get("/v1/timetable/:type/:element/:week", function (req, res) {
        
      request('http://stupid.gso-koeln.de/frames/navbar.htm', DAY).then(function (content) {
        return parser.elements.getRemoteId(content, req.params.type, req.params.element);
      })
      .then(function(remoteId){
        var typesMap = {
          teachers: 't',
          classes: 'c',
          rooms: 'r'
        };
                
        return request('http://stupid.gso-koeln.de/' + strPad(req.params.week,2) + '/' + typesMap[req.params.type] + '/' + typesMap[req.params.type] + remoteId + '.htm', 1000);
      
      })
      .then(function(content){
        return parser.timetable.parse(content);
      })
      .then(function(lessons){
        res.json(lessons);
      }, function(error){
        res.send(error, 500);
      });
    });
};