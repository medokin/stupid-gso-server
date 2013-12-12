module.exports = function (app) {
    var cheerio = require('cheerio');
    var request = require('../lib/request');
    
    
    // Get element list by type
    app.get("/types", function (req, res) {
        res.json(['classes', 'teachers', 'rooms']);
    });
    
    
    // GET /weeks
    // Return an array with available weeks numbers
    app.get("/weeks", function (req, res) {
        var weeks = [];
        
        request('http://stupid.gso-koeln.de/frames/navbar.htm', 500, function (body) {
            $ = cheerio.load(body);
            
            $('select[name=week] > option').each(function(i, elem) {
              weeks.push(elem.attribs.value);
            });
            
            res.json(weeks);
        });
    });
    
    // Get element list by type
    app.get("/elements/:type(teachers|classes|rooms)", function (req, res) {
        res.json(['yes']);
    });
};