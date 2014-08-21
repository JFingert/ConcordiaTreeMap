module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    shell: {
      options : {
        stdout: true
      },
      npm_install: {
        command: 'npm install'
      },
      bower_install: {
        command: './node_modules/.bin/bower install'
      }
    },

    connect: {
      options: {
        base: './'
      },
      webserver: {
        options: {
          port: 5001,
          keepalive: true
        }
      },
      devserver: {
        options: {
          port: 5001
        }
      },
      testserver: {
        options: {
          port: 9999
        }
      },
      coverage: {
        options: {
          base: 'coverage/',
          port: 5555,
          keepalive: true
        }
      }
    },

    open: {
      devserver: {
        path: 'http://localhost:5001'
    },
      coverage: {
        path: 'http://localhost:5555'
      }
    },

    watch: {
      assets: {
        files: ['css/**/*.css','js/**/*.js'],
        tasks: ['concat']
      }
    },

    concat: {
      styles: {
        dest: './assets/app.css',
        src: [
          'css/styles.css'
        ]
      },
      scripts: {
        options: {
          separator: ';'
        },
        dest: './assets/app.js',
        src: [
          'js/app.js',
          'js/services/**/*.js',
          'js/controllers/**/*.js'
        ]
      }
    }
  });

  //installation-related
  grunt.registerTask('install', ['shell:npm_install']);

  //defaults
  grunt.registerTask('default', ['dev']);

  //development
  grunt.registerTask('dev', ['install', 'concat', 'connect:devserver', 'open:devserver', 'watch:assets']);

  //server daemon
  grunt.registerTask('serve', ['connect:webserver']);
};
