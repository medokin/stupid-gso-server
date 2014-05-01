var DAY = 1000 * 60 * 60 * 24;

module.exports = function(app){
  return {
    name: 'getRooms',
    fn: function(next){
      app.untis.rooms().then(function(rooms){
        next(null, rooms);
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
