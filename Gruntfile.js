var jsFiles = [
      'src/utils.js'
    , 'src/stroke_builder.js'
    , 'src/stroke_definitions.js'
    , 'src/haunt.js'
    ]
, jsFilesWithExports = jsFiles.concat('src/exports.js');

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      js: { files: 'src/**/*.js', tasks: 'uglify:ghostwriter' }
    }

  , uglify: {
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
      , files: { 'ghostwriter.js': jsFilesWithExports }
      }
    , ghostwriter_min: {
        options: { mangle: true, compress: true }
      , files: { 'ghostwriter.min.js': jsFilesWithExports }
      }
    }

  , jshint: {
      options: {
      // enforcing options
        curly: true
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

  , exec: {
      open_spec_runner: { cmd: 'open _SpecRunner.html' }
    }

  , jasmine: {
      ghostwriter: {
        src: jsFiles
      , options: {
          specs: 'test/*_spec.js'
        , helpers: 'test/helpers/*'
        , vendor: 'test/vendor/*'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('test:browser', [
    'jasmine:ghostwriter:build'
  , 'exec:open_spec_runner'
  ]);
};
