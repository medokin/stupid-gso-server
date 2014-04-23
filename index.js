var Hapi = require('hapi');

// Create a server with a host and port
var server = Hapi.createServer('localhost', 8888, { cors: true });

// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('test');
        reply('hello world');
    }
});

console.log('starting server on 8080')
server.start();