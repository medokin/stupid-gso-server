var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.server.methods.getSubjects(function (err, subjects) {
      if (err) {
        reply(Boom.serverTimeout(err));
      }
      reply({
        result: subjects,
        meta: {
          timestamp: moment().format()
        }
      });
    });
  };

  return {
    method: 'GET',
    path: '/v1/subjects',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                longName: Joi.string().required(),
                active: Joi.boolean().required()
              }).options({className: 'Subject'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'SubjectsResponse'})
      },
      tags: ['api'],
      description: 'Fetch all subjects',
      notes: [
        'Returns an array of all subjects',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
