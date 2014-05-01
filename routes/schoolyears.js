var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.untis.schoolyears().then(function (schoolyears) {
      reply({
        result: schoolyears,
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
    path: '/v1/schoolyears',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                startDate: Joi.date().required(),
                endDate: Joi.date().required()
              }).options({className: 'Schoolyear'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'SchoolyearResponse'})
      },
      tags: ['api'],
      description: 'Fetch all schoolyears',
      notes: [
        'Returns an array of all schoolyears',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
