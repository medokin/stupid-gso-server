var DAY = 1000 * 60 * 60 * 24;

module.exports = function(app){
  return {
    name: 'getClasses',
    fn: function(next){
      app.untis.classes().then(function(classes){
        next(null, classes);
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
