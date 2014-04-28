var fs = require('fs');

module.exports = function (server) {
    var routes  = null;
    require("fs").readdirSync("./routes").forEach(function (file) {
        console.log('loaded: ' + file);
        routes =  require("./routes/" + file)(server);
    });

    return routes;
}