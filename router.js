var fs = require('fs');

module.exports = function (app) {
  var routes = [];
  require("fs").readdirSync("./routes").forEach(function (file) {
    route = require("./routes/" + file)(app);
    routes.push(route);
  });

  return routes;
}