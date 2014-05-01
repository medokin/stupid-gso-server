var Joi = require('joi');

module.exports = function (app) {
  return {
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply.view('index.html', { greeting: 'hello world' });
      }
    }
  };
}
