var cheerio = require('cheerio');
var RSVP = require('rsvp');

function Class(){};
var p = Class.prototype;

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return true;
        }
    }
    return false;
}

p.parse = function(content, callback){
  var lessons = [];
  var hour = 0;
  
  // walk every row
  for (var i = 0; i < 32; i++) {
    // every second is a dummy
    if (i%2!=1) continue
    
    hour++;
    
    var row = this.getRow(content, i);
    var cells = this.getCells(row);
    
    for (var day = 0; day < 5; day++) {
      var cell = cells[day];
      
      if(!this.hasContent(cell)) continue;
      
      var lesson = this.getContent(cell);
      lesson.hour = hour;
      lesson.day = day+1;
      
      lessons.push(lesson);
      
      // 
      if(cell.attribs.rowspan == undefined) continue;
      
      // If lessons takes more hours
      for (var j = 1; j < cell.attribs.rowspan/2; j++) {
        lesson = this.getContent(cell);
        lesson.hour = hour + j;
        lesson.day = day+1;
        lessons.push(lesson);
      }
      
    }

  }
  var promise = new RSVP.Promise(function(resolve, reject){
    resolve(lessons);
  });
  
  return promise;
};


p.getRow = function(content, number){
    $ = cheerio.load(content);
    
    return $('table[border="3"] > tr').eq(number);
}

p.getCells = function(row){
    $ = cheerio.load(row);
    
    return $('td[rowspan][colspan=6]');
}

p.hasContent = function(cell){
    var $ = cheerio;
    return $(cell).text().trim() != '';
}

p.getContent = function(cell){
    var $ = cheerio;
    var html =  $(cell).html();
    var plaintext =  $(cell).text();
    var texts = plaintext.match(/(\S)+/gi);
    var changed = html.match(/(#FF0000)/gi) == null ? false : true;
    
    return {
        text: texts,
        changed: changed
    }
}

module.exports = new Class();


