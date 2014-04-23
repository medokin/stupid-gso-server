var Hapi = require('hapi');
var Joi = require("joi");
var Stupid = require('stupid-gso');

var server = new Hapi.Server('localhost', 8888);

var gso = new Stupid('FIA23Jaworski', 'njnj', 'njApi');


var teachers = function (request, reply) {
    gso.teachers().then(function (teachers) {
        reply(teachers);
    }, function () {
        reply("error");
    });
};

var classes = function (request, reply) {
    gso.teachers().then(function (teachers) {
        reply(teachers);
    }, function () {
        reply("error");
    });
};

var routes = [
    {
        method: 'GET',
        path: '/teachers',
        config: {
            handler: teachers,
            tags: ['vanilla'],
            description: 'Fetch all teachers',
            notes: 'No parameters',
            cache: {
                expiresIn: 50000
            }
        }
    },
    {
        method: 'GET',
        path: '/classes',
        config: {
            handler: classes,
            tags: ['vanilla'],
            description: 'Fetch all classes',
            notes: 'No parameters',
            cache: {
                expiresIn: 50000
            }
        }
    }
];

server.route(routes);


server.pack.require('lout', function (err) {
    if (err) throw err;

    server.start(function () {
        console.log("Hapi server started @ " + server.info.uri);
    });
});
