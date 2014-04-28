var Hapi = require('hapi');


var server = new Hapi.Server('localhost', 8888, {
  state: {
    cookies: {
      failAction: 'log'
    }
  },
  cache: 'catbox-memory'
});

server.views({
  engines: {
    html: 'handlebars'
  },
  path: 'views'
});

server.route(require('./router')(server));


var swaggerOptions = {
  basePath: 'http://localhost:8888',
  apiVersion: '1'
};

server.on('log', function (event, tags) {
  console.log('[Server Log]: '+ event.data);
});

server.pack.require({'hapi-swagger': swaggerOptions}, function (err) {
  if (!err && err !== null) {
    server.log(['error'], 'Plugin "hapi-swagger" load error: ' + err)
  } else {
    server.log(['start'], 'swagger interface loaded')
  }
});


server.on('internalError', function (request, err) {
  console.log('Error response (500) sent for request: ' + request.id + ' because: ' + err.message);
});

server.start(function () {
  console.log("Hapi server started @ " + server.info.uri);
});

