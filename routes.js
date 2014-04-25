var Stupid = require('stupid-gso');
var Boom = require('boom');
var Joi = require('joi');
var moment = require('moment');

var gso = new Stupid('FIA23Jaworski', 'njnj', 'njApi');

var teachers = function (request, reply) {
  gso.teachers().then(function (teachers) {
    reply({
      result: teachers,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var classes = function (request, reply) {
  gso.classes().then(function (classes) {
    reply({
      result: classes,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var subjects = function (request, reply) {
  gso.subjects().then(function (subjects) {
    reply({
      result: subjects,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var rooms = function (request, reply) {
  gso.rooms().then(function (rooms) {
    reply({
      result: rooms,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var departments = function (request, reply) {
  gso.departments().then(function (departments) {
    reply({
      result: departments,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var timetable = function (request, reply) {
  gso.timetable(request.params.id, request.params.type, request.query.startDate, request.query.endDate).then(function (timetable) {
    reply({
      result: timetable,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var holidays = function (request, reply) {
  gso.holidays().then(function (holidays) {
    reply({
      result: holidays,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var schoolyears = function (request, reply) {
  gso.schoolyears().then(function (schoolyears) {
    reply({
      result: schoolyears,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var currentSchoolyear = function (request, reply) {
  gso.currentSchoolyear().then(function (currentSchoolyear) {
    reply({
      result: currentSchoolyear,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var statusData = function (request, reply) {
  gso.statusData().then(function (statusData) {
    reply({
      result: statusData,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

var substitutions = function (request, reply) {
  gso.substitutions(request.params.startDate, request.params.endDate, request.query.departmentId).then(function (substitutions) {
    reply({
      result: substitutions,
      meta: {
        timestamp: moment().format()
      }
    });
  }, function () {
    reply(Boom.serverTimeout());
  });
};

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply.view('index.html', { greeting: 'hello world' });
      }
    }
  },
  {
    method: 'GET',
    path: '/v1/teachers',
    config: {
      handler: teachers,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                foreName: Joi.string().allow('').required(),
                longName: Joi.string().required(),
                active: Joi.boolean().required(),
                dids: Joi.array()
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
  },
  {
    method: 'GET',
    path: '/v1/classes',
    config: {
      handler: classes,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                longName: Joi.string().required(),
                active: Joi.boolean().required(),
                did: Joi.number().integer()
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
  },
  {
    method: 'GET',
    path: '/v1/subjects',
    config: {
      handler: subjects,
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
  },
  {
    method: 'GET',
    path: '/v1/rooms',
    config: {
      handler: rooms,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                longName: Joi.string().required(),
                active: Joi.boolean().required(),
                building: Joi.string().allow('').required(),
                did: Joi.number().integer()
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
  },
  {
    method: 'GET',
    path: '/v1/departments',
    config: {
      handler: departments,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                longName: Joi.string().required()
              }).options({className: 'Department'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'DepartmentsResponse'})
      },
      tags: ['api'],
      description: 'Fetch all departments',
      notes: [
        'Returns an array of all departments',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  },
  {
    method: 'GET',
    path: '/v1/timetable/{id}/{type}',
    config: {
      handler: timetable,
      validate: {
        path: {
          type: Joi.number()
              .integer()
              .required()
              .valid([1,2,3,4,5])
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
                date: Joi.number().integer().required(),
                startTime: Joi.number().integer().required(),
                endTime: Joi.number().integer().required(),
                lstype: Joi.string().allow(['ls', 'oh', 'sb', 'bs', 'ex']),
                code: Joi.string().allow(['cancelled', 'irregular']),
                kl: Joi.array().includes(Joi.object({id: Joi.number().integer().required()}).options({className: 'Id'})).description('classes'),
                te: Joi.array().includes(Joi.object({id: Joi.number().integer().required()}).options({className: 'Id'})).description('teachers'),
                su: Joi.array().includes(Joi.object({id: Joi.number().integer().required()}).options({className: 'Id'})).description('subject'),
                ro: Joi.array().includes(Joi.object({id: Joi.number().integer().required()}).options({className: 'Id'})).description('rooms')
              }).options({className: 'Lesson'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'TimetableResponse'})
      },
      tags: ['api'],
      description: 'Fetch lessons',
      notes: [
        'Returns an array of lessons',
        'Error status codes',
        '400, Bad Request',
        '503, Service Unavailable'
      ]
    }
  },
  {
    method: 'GET',
    path: '/v1/holidays',
    config: {
      handler: holidays,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                longName: Joi.string().required(),
                startDate: Joi.number().integer().required(),
                endDate: Joi.number().integer().required()
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
  },
  {
    method: 'GET',
    path: '/v1/schoolyears',
    config: {
      handler: schoolyears,
      response: {
        schema: Joi.object({
          result: Joi.array().includes(
              Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().required(),
                startDate: Joi.number().integer().required(),
                endDate: Joi.number().integer().required()
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
  },
  {
    method: 'GET',
    path: '/v1/currentSchoolyear',
    config: {
      handler: currentSchoolyear,
      response: {
        schema: Joi.object({
          result: Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string().required(),
            startDate: Joi.number().integer().required(),
            endDate: Joi.number().integer().required()
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
  },
  {
    method: 'GET',
    path: '/v1/statusData',
    config: {
      handler: statusData,
      response: {
        schema: Joi.object({
          result: Joi.object().required().options({className: 'StatusData'}),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'StatusDataResponse'})
      },
      tags: ['api'],
      description: 'Fetch all status data',
      notes: [
        'Returns an array of all status data',
        'Error status codes',
        '503, Service Unavailable'
      ]
    }
  },
  {
    method: 'GET',
    path: '/v1/substitutions/{startDate}/{endDate}',
    config: {
      handler: substitutions,
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
                lsid: Joi.number().integer().required(),
                date: Joi.number().integer().required(),
                reschedule: Joi.object({
                  date: Joi.number().integer().required(),
                  startTime: Joi.number().integer().required(),
                  endTime: Joi.number().integer().required()
                }).options({className: 'Reschedule'}),
                startTime: Joi.number().integer().required(),
                endTime: Joi.number().integer().required(),
                txt: Joi.string(),
                kl: Joi.array().includes(Joi.object({id: Joi.number().integer().required()}).options({className: 'Id'})).description('Classes'),
                te: Joi.array().includes(Joi.object({id: Joi.number().integer().required()}).options({className: 'Id'})).description('Teachers'),
                su: Joi.array().includes(Joi.object({id: Joi.number().integer().required()}).options({className: 'Id'})).description('Subject'),
                ro: Joi.array().includes(Joi.object({id: Joi.number().integer().required(), orgid: Joi.number().integer()}).options({className: 'IdOrig'})).description('Rooms')
              }).options({className: 'Substitution'})
          ).required(),
          meta: Joi.object({
            timestamp: Joi.date().required()
          }).required().options({className: 'Meta'})
        }).options({className: 'SubstitutionResponse'})
      },
      tags: ['api'],
      description: 'Fetch all status data',
      notes: [
        'Returns an array of all status data',
        'Error status codes',
        '400, Bad Request',
        '503, Service Unavailable'
      ]
    }
  }
];

