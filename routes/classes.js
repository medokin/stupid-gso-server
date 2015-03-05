var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.server.methods.getClasses(function (err, classes) {
      if (err) {
        reply(Boom.serverTimeout(err));
      }
      reply({
        result: classes,
        meta: {
          timestamp: moment().format()
        }
      });
    });
  };

  return {
    method: 'GET',
    path: '/v1/classes',
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
              }).options({className: 'Class'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'ClassesResponse'})
      },
      tags: ['api'],
      description: 'Fetch all classes',
      notes: [
        'Returns an array of all classes',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
