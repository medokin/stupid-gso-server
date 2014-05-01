var DAY = 1000 * 60 * 60 * 24;

module.exports = function(app){
  return {
    name: 'getSubjects',
    fn: function(next){
      app.untis.subjects().then(function(subjects){
        next(null, subjects);
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
