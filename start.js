var Hapi = require('hapi');
var Stupid = require('stupid-gso');
var untis = new Stupid(process.env.GSO_USER, process.env.GSO_PASS, 'njApi');

var server = new Hapi.Server('0.0.0.0', 8888, {
  cors: true,
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

var app = {
  server: server,
  untis: untis
}

server.route(require('./router')(app));

require("fs").readdirSync("./methods").forEach(function (file) {
  var method = require("./methods/" + file)(app);
  app.server.method(method);
});

var swaggerOptions = {
  basePath: '/',
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
