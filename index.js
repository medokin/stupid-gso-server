var express = require('express');

var app = express();
app.use(express.logger('dev'));
require('./routes')(app);

app.listen(8000);