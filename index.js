var express = require('express');
var engines = require('consolidate');

var app = express();

app.engine('html', engines.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

app.use(express.logger('dev'));
app.use(express.static('public'))
require('./routes')(app);

app.listen(8000);