var Hapi = require('hapi');


var server = new Hapi.Server('localhost', 8888);

server.views({
  engines: {
    html: 'handlebars'
  },
  path: 'views'
});

server.route(require('./routes'));


var swaggerOptions = {
  basePath: 'http://localhost:8888',
  apiVersion: '1'
};

server.pack.require({'hapi-swagger': swaggerOptions}, function (err) {
  if (!err && err !== null) {
    server.log(['error'], 'Plugin "hapi-swagger" load error: ' + err)
  } else {
    server.log(['start'], 'swagger interface loaded')
  }
});

server.pack.require({'lout': {endpoint: '/lout'}}, function(err) {
  if (!err && err !== null) {
    server.log(['error'], 'Plugin "lout" load error: ' + err)
  } else {
    server.log(['start'], 'lout interface loaded')
  }
});
server.on('internalError', function (request, err) {
  console.log('Error response (500) sent for request: ' + request.id + ' because: ' + err.message);
});

  server.start(function () {
    console.log("Hapi server started @ " + server.info.uri);
  });

