'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: {
            'css': {
                'public/build/css/dist.min.css': [
                    'public/lib/bootstrap/dist/css/bootstrap.css',
                    'public/css/**/*.css'
                ]
            },
            'js': {
                'public/build/js/dist.min.js': [
                    'public/lib/angular/angular.js',
                    'public/lib/angular-cookies/angular-cookies.js',
                    'public/lib/angular-resource/angular-resource.js',
                    'public/lib/angular-ui-router/release/angular-ui-router.js',
                    'public/lib/angular-bootstrap/ui-bootstrap.js',
                    'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                    'public/js/**/*.js'
                ]
            }
        },
        watch: {
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/views/**', 'app/views/**'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['public/css/**'],
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js', '!test/coverage/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            production: {
                files: '<%= assets.js %>'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: ['public/css/**/*.css']
            }
        },
        cssmin: {
            combine: {
                files: '<%= assets.css %>'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force', true);

    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['jshint', 'csslint', 'cssmin', 'uglify', 'concurrent']);
    } else {
        grunt.registerTask('default', ['jshint', 'csslint', 'concurrent']);
    }
};