var Stupid = require('stupid-gso');
var Boom = require('boom');

var gso = new Stupid('FIA23Jaworski', 'njnj', 'njApi');

var teachers = function (request, reply) {
    gso.teachers().then(function (teachers) {
        reply(teachers);
    }, function () {
        reply(Boom.badImplementation());
    });
};

var classes = function (request, reply) {
    gso.classes().then(function (classes) {
        reply(classes);
    }, function () {
        reply(Boom.badImplementation());
    });
};

var subjects = function (request, reply) {
    gso.subjects().then(function (subjects) {
        reply(subjects);
    }, function () {
        reply(Boom.badImplementation());
    });
};

var rooms = function (request, reply) {
    gso.rooms().then(function (rooms) {
        reply(rooms);
    }, function () {
        reply(Boom.badImplementation());
    });
};

var departments = function (request, reply) {
    gso.departments().then(function (departments) {
        reply(departments);
    }, function () {
        reply(Boom.badImplementation());
    });
};

module.exports = [
    {
        method: 'GET',
        path: '/',
        config: {
            handler: function(request, reply){
                reply(Boom.badImplementation());
            }
        }
    },
    {
        method: 'GET',
        path: '/teachers',
        config: {
            handler: teachers,
            tags: ['api'],
            description: 'Fetch all teachers',
            notes: 'No parameters',
            cache: {
                expiresIn: 60 * 1000 * 60
            }
        }
    },
    {
        method: 'GET',
        path: '/classes',
        config: {
            handler: classes,
            tags: ['api'],
            description: 'Fetch all classes',
            notes: 'No parameters',
            cache: {
                expiresIn: 60 * 1000 * 60
            }
        }
    },
    {
        method: 'GET',
        path: '/subjects',
        config: {
            handler: subjects,
            tags: ['api'],
            description: 'Fetch all subjects',
            notes: 'No parameters',
            cache: {
                expiresIn: 60 * 1000 * 60
            }
        }
    },
    {
        method: 'GET',
        path: '/rooms',
        config: {
            handler: rooms,
            tags: ['api'],
            description: 'Fetch all rooms',
            notes: 'No parameters',
            cache: {
                expiresIn: 60 * 1000 * 60
            }
        }
    },
    {
        method: 'GET',
        path: '/departments',
        config: {
            handler: departments,
            tags: ['api'],
            description: 'Fetch all departments',
            notes: 'No parameters',
            cache: {
                expiresIn: 60 * 1000 * 60
            }
        }
    }
];

