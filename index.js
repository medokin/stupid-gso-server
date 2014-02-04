var express = require('express');

var app = express();

// Cache and Compress
var month = 60*60*24*30*24*30;
app.use(express.compress());
app.use(express.static('public', { maxAge: month }));


//Logger
app.use(express.logger('dev'));

// Load Routes
require('./routes')(app);

app.listen(8080);