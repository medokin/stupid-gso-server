var express = require('express');
var engines = require('consolidate');

var app = express();

// View Config
app.engine('html', engines.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

// Cache and Compress
var month = 60*60*24*30*24*30;
app.use(express.compress());
app.use(express.static('public', { maxAge: month }));


//Logger
app.use(express.logger('dev'));

// Load Routes
require('./routes')(app);

app.listen(3001);