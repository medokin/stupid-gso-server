var Hapi = require('hapi');
var Joi = require("joi");


var server = new Hapi.Server('localhost', 8888);






server.route(require('./routes'));


server.pack.require('lout', function (err) {
    if (err) throw err;

    server.start(function () {
        console.log("Hapi server started @ " + server.info.uri);
    });
});
