var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.until.latestImportTime().then(function (lastImport) {
      reply({
        result: moment(lastImport).format(),
        meta: {
          timestamp: moment().format()
        }
      });
    }, function (err) {
      reply(Boom.serverTimeout(err));
    });
  };

  return {
    method: 'GET',
    path: '/v1/last_import',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.date().required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'LastImportResponse'})
      },
      tags: ['api'],
      description: 'Fetch last import time',
      notes: [
        'Returns a timestamp from last data import',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
