var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.server.methods.getTeachers(function (err, teachers) {
      if (err) {
        reply(Boom.serverTimeout(err));
      }
      reply({
        result: teachers,
        meta: {
          timestamp: moment().format()
        }
      });
    });
  };

  return {
    method: 'GET',
    path: '/v1/teachers',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                foreName: Joi.string().allow('').required(),
                longName: Joi.string().required(),
                active: Joi.boolean().required()
              }).options({className: 'Teacher'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'TeachersResponse'})
      },
      tags: ['api'],
      description: 'Fetch all teachers',
      notes: [
        'Returns an array of all teachers',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
