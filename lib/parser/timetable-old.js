var cheerio = require('cheerio');

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

        
    $ = cheerio.load(content);
    var lessons = [];
    var empty = [
        [],[],[],[],[]
    ];
    
    // Gehe durch die Zeilen
    for (var i = 0; i < 32; i++) {
        // Jede 2. ist ein Dummy, also überspringen
        if (i%2==1) continue;
        console.log('row', i)
        var row = this.getRow(content, i);

        var cells = this.getCells(row);
        console.log()
        var hour = i/2;
        
        var lesson = false;
        
        
        for (var day = 0; day < 5; day++) {
            
            if(inArray(hour, empty[day])){
                continue;
            }

            var cell = cells[day];

            var cellHasContent = this.hasContent(cell);
            
            if(cellHasContent){
                lesson = this.getContent(cell);
                lesson.hour = hour;
                lesson.day = day+1;
                
                lessons.push(lesson);
            }
            
            for (var j = 0; j < cell.attribs.rowspan/2; j++) {
                if(lesson){
                    lesson.hour = hour+j;
                    lessons.push(lesson);
                }
                
                empty[day].push(hour+j);
            }
        }
    }
    
    callback(lessons);
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


