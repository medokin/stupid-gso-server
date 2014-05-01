var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.untis.statusData().then(function (statusData) {
      reply({
        result: statusData,
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
    path: '/v1/colors',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.object().required().options({className: 'StatusData'}),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'StatusDataResponse'})
      },
      tags: ['api'],
      description: 'Fetch all status colors',
      notes: [
        'Returns all status colors',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
