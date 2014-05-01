var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.untis.substitutions(request.params.startDate, request.params.endDate, request.query.departmentId).then(function (substitutions) {
      reply({
        result: substitutions,
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
    path: '/v1/substitutions/{startDate}/{endDate}',
    config: {
      handler: handler,
      validate: {
        path: {
          startDate: Joi.number()
              .integer()
              .required()
              .description('Format: yyyymmdd'),
          endDate: Joi.number()
              .integer()
              .required()
              .description('Format: yyyymmdd')
        },
        query: {
          departmentId: Joi.number().integer().default(0)
        }
      },
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                type: Joi.string().required(),
                date: Joi.date().required(),
                startTime: Joi.any(),
                endTime: Joi.any(),
                reschedule: Joi.object({
                  date: Joi.date().required(),
                  startTime: Joi.any(),
                  endTime: Joi.any()
                }).options({className: 'Reschedule'}),
                classes: Joi.array().includes(Joi.number().integer().required()).description('classes'),
                teachers: Joi.array().includes(Joi.number().integer().required()).description('teachers'),
                subjects: Joi.array().includes(Joi.number().integer().required()).description('subject'),
                rooms: Joi.array().includes(Joi.number().integer().required()).description('rooms')
              }).options({className: 'Substitution'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'SubstitutionsResponse'})
      },
      tags: ['api'],
      description: 'Fetch all substitutions',
      notes: [
        'Returns an array of all substitutions beetween two dates',
        'Error status codes',
        '400, Bad Request',
        '503, Service Unavailable'
      ]
    }
  }

}
