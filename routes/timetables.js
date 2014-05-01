var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.untis.timetable(request.params.id, request.params.type, request.query.startDate, request.query.endDate).then(function (timetable) {
      reply({
        result: timetable,
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
    path: '/v1/timetables/{id}/{type}',
    config: {
      handler: handler,
      validate: {
        path: {
          type: Joi.number()
              .integer()
              .required()
              .valid([1, 2, 3, 4, 5])
              .description('1 = classes, 2 = teachers, 3 = subjects, 4 = rooms, 5 = students'),
          id: Joi.number()
              .integer()
              .required()
              .description('Element id of given type')
        },
        query: {
          startDate: Joi.number()
              .integer()
              .with('endDate')
              .description('Format: yyyymmdd <br />Is required when endDate is set. <br />Default: actual date'),
          endDate: Joi.number()
              .integer()
              .with('startDate')
              .description('Format: yyyymmdd <br />Is required when startDate is set. <br />Default: actual date')
        }
      },
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                date: Joi.date().required(),
                startTime: Joi.any(),
                endTime: Joi.any(),
                type: Joi.any(),
                code: Joi.string(),
                classes: Joi.array().includes(Joi.number().integer().required()).description('classes'),
                teachers: Joi.array().includes(Joi.number().integer().required()).description('teachers'),
                subjects: Joi.array().includes(Joi.number().integer().required()).description('subject'),
                rooms: Joi.array().includes(Joi.number().integer().required()).description('rooms')
              }).options({className: 'Lesson'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'TimetableResponse'})
      },
      tags: ['api'],
      description: 'Fetch all lessons',
      notes: [
        'Returns an array of lessons',
        'Error status codes',
        '400, Bad Request',
        '503, Service Unavailable'
      ]
    }
  }
}
