var jsFiles = [
  'src/utils.js'
, 'src/strokes.js'
, 'src/ghostwriter.js'
, 'src/exports.js'
];

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      js: { files: 'src/**/*.js', tasks: 'uglify:ghostwriter' }
    },

    uglify: {
      options: {
        wrap: 'ghostwriter'
      , banner: [
          '// ghostwriter'
        , '// ==========='
        , '// * GitHub: https://github.com/jharding/ghostwriter'
        , '// * Copyright (c) <%= grunt.template.today("yyyy") %> Jake Harding'
        , '// * Licensed under the MIT license.\n'
        ].join('\n')
      }
    , ghostwriter: {
        options: { mangle: false, beautify: true, compress: false }
      , files: { 'ghostwriter.js': jsFiles }
      }
    , ghostwriter_min: {
        options: { mangle: true, compress: true }
      , files: { 'ghostwriter.min.js': jsFiles }
      }
    },

    jshint: {
      options: {
      // enforcing options
        bitwise: true
      , curly: true
      , newcap: true
      , noarg: true
      , noempty: true
      , nonew: true
      , quotmark: true
      , trailing: true
      , maxlen: 80

      // relaxing options
      , boss: true
      , es5: true
      , expr: true
      , laxcomma: true

      // environments
      , browser: true
      }
    , tests: ['test/*.js']
    , gruntfile: ['Gruntfile.js']
    , ghostwriter: ['src/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['uglify']);
};
