var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.untis.holidays().then(function (holidays) {
      reply({
        result: holidays,
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
    path: '/v1/holidays',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                longName: Joi.string().required(),
                startDate: Joi.date().required(),
                endDate: Joi.date().required()
              }).options({className: 'Holiday'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'HolidayResponse'})
      },
      tags: ['api'],
      description: 'Fetch all holidays',
      notes: [
        'Returns an array of all holidays',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
