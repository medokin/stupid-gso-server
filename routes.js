var Stupid = require('stupid-gso');
var Boom = require('boom');
var Joi = require('joi');
var moment = require('moment');
var _ = require('lodash');


var gso = new Stupid('FIA23Jaworski', 'njnj', 'njApi');

var teachers = function (request, reply) {
    gso.teachers().then(function (teachers) {
        reply({
            result: teachers,
            meta: {
                timestamp: moment().format()
            }
        });
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
    }, function (err) {
        reply(Boom.serverTimeout(err));
    });
};

var timegrid = function (request, reply) {
    gso.timegridUnits().then(function (timegrid) {
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

var lastImport = function (request, reply) {
    gso.latestImportTime().then(function (lastImport) {
        reply({
            result: moment(lastImport).format(),
            meta: {
                timestamp: moment().format()
            }
        });
    }, function (err) {
        reply(Boom.serverTimeout(err));
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
        path: '/{param*}',
        config: {
            handler: {
                directory: { path: './public/' }
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
    },
    {
        method: 'GET',
        path: '/v1/current_schoolyear',
        config: {
            handler: currentSchoolyear,
            response: {
                schema: Joi.object({
                    result: Joi.object({
                        id: Joi.number().integer().required(),
                        name: Joi.string().required(),
                        startDate: Joi.date().required(),
                        endDate: Joi.date().required()
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
        path: '/v1/colors',
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
            description: 'Fetch all status colors',
            notes: [
                'Returns all status colors',
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
    },
    {
        method: 'GET',
        path: '/v1/timegrid',
        config: {
            handler: timegrid,
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
    },
    {
        method: 'GET',
        path: '/v1/last_import',
        config: {
            handler: lastImport,
            response: {
                schema: Joi.object({
                    result: Joi.date().required(),
                    meta: Joi.object({
                        timestamp: Joi.date().required()
                    }).required().options({className: 'Meta'})
                }).options({className: 'LastImportResponse'})
            },
            tags: ['api'],
            description: 'Fetch last import time',
            notes: [
                'Returns a timestamp from last data import',
                'Error status codes',
                '503, Service Unavailable'
            ]
        }
    }
];

