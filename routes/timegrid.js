var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.untis.timegrid().then(function (timegrid) {
      reply({
        result: timegrid,
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
    path: '/v1/timegrid',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                day: Joi.number().integer().required().description('1 = sunday, 2 = monday, ..., 7 = saturday'),
                lessons: Joi.array().includes(Joi.object({
                  name: Joi.string().allow('').required(),
                  startTime: Joi.object({hour: Joi.number().required(), minutes: Joi.number().required()}).options({className: 'LessonTime'}).required(),
                  endTime: Joi.object({hour: Joi.number().required(), minutes: Joi.number().required()}).options({className: 'LessonTime'}).required()
                }).required().options({className: 'Unit'})).required()
              }).required().options({className: 'Timegrid'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'TimegridResponse'})
      },
      tags: ['api'],
      description: 'Fetch all timegrid units',
      notes: [
        'Returns an array of all timegrid units',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
