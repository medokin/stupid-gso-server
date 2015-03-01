var MIN10 = 1000 * 60 * 10;

module.exports = function(app){
  return {
    name: 'getSubstitutions',
    fn: function(startDate, endDate, departmentId, next){
      app.untis.substitutions(startDate, endDate, departmentId).then(function(substitutions){
        next(null, substitutions);
      }, function(err){
        next(err);
      });
    },
    options: {
      cache: {
        expiresIn: MIN10
      }
    }
  }
}
