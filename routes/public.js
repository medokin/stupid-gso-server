var Joi = require('joi');

module.exports = function (app) {
  return {
    method: 'GET',
    path: '/{param*}',
    config: {
      handler: {
        directory: { path: './public/' }
      }
    }
  };
}
