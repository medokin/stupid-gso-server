module.exports = function (app) {
    var request = require('../lib/request');
    var parser = require('../lib/parser');
    var DAY = 86400000;
    
    
    // Get element list by type
    app.get("/types", function (req, res) {
        res.json(['classes', 'teachers', 'rooms']);
    });
    
    
    // GET /weeks
    // Returns an array with available weeks numbers
    app.get("/weeks", function (req, res) {
        
        request('http://stupid.gso-koeln.de/frames/navbar.htm', DAY, function (body) {
            
            parser.weeks.parse(body, function(weeks){
                res.json(weeks);
            });
            
        });
        
    });
    
    // GET /elements/:type
    // Returns an array with all available elements for given type
    app.get("/elements/:type(teachers|classes|rooms)", function (req, res) {
        
        request('http://stupid.gso-koeln.de/frames/navbar.htm', DAY, function (body) {
            
            parser.elements.parse(body, req.params.type, function(elements){
                res.json(elements);
            });
            
        });
        
    });
    
    // GET /timetable/:type/:element
    // Returns an array with all available elements for given type
    app.get("/timetable/:type/:element/:week", function (req, res) {
        
        request('http://stupid.gso-koeln.de/frames/navbar.htm', DAY, function (body) {
            
            parser.elements.getRemoteId(body, req.params.type, req.params.element, function(remoteId){
                
                var typesMap = {
                    teachers: 't',
                    classes: 'c',
                    rooms: 'r'
                };
                
                request('http://stupid.gso-koeln.de/' + req.params.week + '/' + typesMap[req.params.type] + '/' + typesMap[req.params.type] + remoteId + '.htm', DAY, function(body){
                    parser.timetable.parse(body, function(result){
                       res.send(result); 
                    });
                });
            
            });
            
        });
        
    });
};