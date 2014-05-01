var DAY = 1000 * 60 * 60 * 24;

module.exports = function(app){
  return {
    name: 'getTeachers',
    fn: function(next){
      app.untis.teachers().then(function(teachers){
        next(null, teachers);
      }, function(err){
        next(err);
      });
    },
    options: {
      cache: {
        expiresIn: DAY
      }
    }
  }
}
