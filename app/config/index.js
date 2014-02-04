var nconf = require('nconf');

function Config() {
  var environment;

  nconf.argv().env('_');
  environment = nconf.get('NODE:ENV') || 'development';

  console.log('Environment config: '+ environment);
  nconf.file(environment, 'config/' + environment + '.json');
  nconf.file('default', 'config/default.json');
}

Config.prototype.get = function(key) {
  return nconf.get(key);
};

Config.prototype.set = function(key) {
  return nconf.set(key);
};

module.exports = new Config();