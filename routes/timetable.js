var Joi = require('joi');
var Boom = require('boom');
var moment = require('moment');
var _ = require('lodash');
var RSVP = require('rsvp');

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


module.exports = function (app) {

  var handler = function (request, reply) {

    var week = request.params.week,
        year = request.params.year;

    var startDate = moment(week+"-"+year, 'W-YYYY').isoWeekday(1).format('YYYYMMDD');
    var endDate = moment(week+"-"+year, 'W-YYYY').isoWeekday(7).format('YYYYMMDD');

    app.untis.timetable(request.params.id, request.params.type, startDate, endDate)
        .then(function(timetable){

          var elements = new RSVP.Promise(function(resolve, reject){
            app.server.methods.getTeachers(function(err, teachers){
              app.server.methods.getSubjects(function(err, subjects){
                app.server.methods.getClasses(function(err, classes){
                  app.server.methods.getRooms(function(err, rooms){
                    app.server.methods.getSubstitutions(startDate, endDate, null, function(err, substitutions){
                      resolve({
                        classes: classes,
                        subjects: subjects,
                        rooms: rooms,
                        teachers: teachers,
                        substitutions: substitutions
                      })
                    })
                  })
                })
              })
            })
          });

          return RSVP.hash({
            elements: elements,
            timetable: timetable
          });
        })
        .then(function(result){
          var timetable = result.timetable;

          var reschedules = _.filter(result.elements.substitutions, {type: 'shift'});
          var roomChanges = _.filter(result.elements.substitutions, {type: 'rmchg'});

          var timetableWithReschedules = _.map(timetable, function(lesson){
            _.forEach(reschedules, function(n, key) {
              if(lesson.date == n.date &&
                lesson.startTime.hour == n.startTime.hour &&
                lesson.startTime.minutes == n.startTime.minutes){
                if(request.params.type === 1){
                  var intersections = _.intersection(lesson.classes, n.classes);
                  if(intersections.length !== 0){
                    n.code =  'shift';
                    lesson = clone(n);
                  }
                }
                if(request.params.type === 2){
                  var intersections = _.intersection(lesson.teachers, n.teachers);
                  if(intersections.length !== 0){
                    n.code =  'shift';
                    lesson = clone(n);
                  }
                }
                if(request.params.type === 4){
                  var intersections = _.intersection(lesson.rooms, n.rooms);
                  if(intersections.length !== 0){
                    n.code =  'shift';
                    lesson = clone(n);
                  }
                }
              }
            });

            return lesson;
          });

          timetableWithReschedules = _.uniq(timetableWithReschedules, function(item){
            return JSON.stringify(item);
          });

          var timetableWithRoomChanges = _.map(timetableWithReschedules, function(lesson){
            _.forEach(roomChanges, function(n, key) {
              if(lesson.date == n.date &&
                lesson.startTime.hour == n.startTime.hour &&
                lesson.startTime.minutes == n.startTime.minutes){
                  if(request.params.type === 1){
                    var intersections = _.intersection(lesson.classes, n.classes);
                    if(intersections.length !== 0){
                      n.code =  'roomChange';
                      lesson = clone(n);
                    }
                  }
                  if(request.params.type === 2){
                    var intersections = _.intersection(lesson.teachers, n.teachers);
                    if(intersections.length !== 0){
                      n.code =  'roomChange';
                      lesson = clone(n);
                    }
                  }
                  if(request.params.type === 4){
                    var intersections = _.intersection(lesson.rooms, n.rooms);
                    if(intersections.length !== 0){
                      n.code =  'roomChange';
                      lesson = clone(n);
                    }
                  }
              }
            });

            return lesson;
          });

          var result = _.map(timetableWithRoomChanges, function(lesson){
            var teachers = [];
            lesson.teachers.forEach(function(id){
              var test = _.find(result.elements.teachers, {id: id});
              teachers.push(test);
            });
            lesson.teachers = teachers;

            var classes = [];
            lesson.classes.forEach(function(id){
              var test = _.find(result.elements.classes, {id: id});
              classes.push(test);
            });
            lesson.classes = classes;

            var subjects = [];
            lesson.subjects.forEach(function(id){
              var test = _.find(result.elements.subjects, {id: id});
              subjects.push(test);
            });
            lesson.subjects = subjects;

            var rooms = [];
            lesson.rooms.forEach(function(id){
              if(lesson.type === 'shift'){
                console.log(id);
              }
              var test = _.find(result.elements.rooms, {id: id});
              rooms.push(test);
            });
            lesson.rooms = rooms;

            if(lesson.type === 'shift'){
              console.log(lesson.date, lesson.startTime);
            }
            return lesson;
          });


          return result;
        })
        .then(function (timetable) {
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
    path: '/v2/timetable/{id}/{type}/{year}/{week}',
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
              .description('Element id of given type'),
          year: Joi.number()
              .integer()
              .required()
              .min(2000)
              .max(2050)
              .description('Year'),
          week: Joi.number()
              .integer()
              .required()
              .min(1)
              .max(52)
              .description('Week of year')
        }
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
