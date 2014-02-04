var config = require('./app/config');

console.log(config.get('sequelize:host'));

module.exports = function(grunt) {

  grunt.initConfig({
      shell: {                                // Task
          migrate: {                      // Target
              options: {                      // Options
                  stdout: true
              },
              command: 'ls'
          }
      }
  });
  
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('default', ['shell']);

};