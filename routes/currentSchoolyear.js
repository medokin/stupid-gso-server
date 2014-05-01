var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.untis.currentSchoolyear().then(function (currentSchoolyear) {
      reply({
        result: currentSchoolyear,
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
    path: '/v1/current_schoolyear',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required()
          }).required().options({className: 'Schoolyear'}),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'CurrentSchoolyearResponse'})
      },
      tags: ['api'],
      description: 'Fetch current schoolyear',
      notes: [
        'Returns current schoolyears',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
