var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');


module.exports = function (app) {

  var handler = function (request, reply) {
    app.server.methods.getRooms(function (err, rooms) {
      if (err) {
        reply(Boom.serverTimeout(err));
      }
      reply({
        result: rooms,
        meta: {
          timestamp: moment().format()
        }
      });
    });
  };

  return {
    method: 'GET',
    path: '/v1/rooms',
    config: {
      handler: handler,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                longName: Joi.string().required(),
                active: Joi.boolean().required(),
                building: Joi.string().allow('').required()
              }).options({className: 'Room'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'RoomsResponse'})
      },
      tags: ['api'],
      description: 'Fetch all rooms',
      notes: [
        'Returns an array of all rooms',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  }

}
