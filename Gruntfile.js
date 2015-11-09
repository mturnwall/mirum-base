'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    // configurable paths
    var config = {
        app: 'app',
        dev: 'dev',
        dist: 'dist',
        tmp: '.tmp'
    };

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // individual grunt task files
    // require('load-grunt-config')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        /**
         * grunt-contrib-clean
         * https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            dev: ['<%= config.tmp %>', '<%= config.dev %>', '<%= config.dist %>']
        },

        /**
         * grunt-contrib-connect
         * https://github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            options: {
                port: 9002,
                hostname: '0.0.0.0',
                livereload: true,
                debug: true
            },
            server: {
                options: {
                    base: ['<%= config.app %>', '<%= config.dev %>'],
                    open: true
                }
            }
        },

        /**
         * grunt-eslint
         * https://github.com/sindresorhus/grunt-eslint
         */
        eslint: {
            target: [
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/libs/*',
                '!<%= config.app %>/scripts/compiled/*'
            ]
        },

        /**
         * grunt-contrib-uflify
         * https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                screwIE8: true
            },
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    sourceMap: true,
                    // sourceMapIn: '<%= config.tmp %>/scripts/master.js.map',
                    screwIE8: true
                },
                files: {
                    '<%= config.dev %>/scripts/master.js': [
                        '<%= config.tmp %>/scripts/master.js'
                    ]
                }
            },
            dist: {}
        },

        /**
         * grunt-contrib-watch
         * https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['<%= config.app %>/css/sass/**/*.scss'],
                tasks: ['sass:dev', 'replace:sourceMaps', 'postcss:dev']
            },
            scripts: {
                files: [
                    '<%= config.app %>/scripts/{,*/}*.js',
                    '!<%= config.app %>/scripts/libs/*',
                    '!<%= config.app %>/scripts/compiled/*'
                ],
                tasks: ['eslint', 'concat', 'babel']
            },
            html: {
                files: [
                    '<%= config.app %>/*.html'
                ]
            }
        },

        /**
         * grunt-webpack
         * https://github.com/webpack/grunt-webpack
         */
        webpack: {
            options: {
                entry: {
                    app: './<%= config.app %>/scripts/app.js'
                },
                output: {
                    path: '<%= config.tmp %>/scripts/',
                    filename: 'master.js'
                },
                module: {
                    loaders: [{
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true,
                            presets: ['es2015']
                        }
                    }]
                }
            },
            'build-dev': {
                progress: true,
                debug: true
            }
        }

    });
    grunt.registerTask('js', 'Compile javascript', function js(target) {
        grunt.task.run([
            'eslint',
            'webpack:build-dev',
            'uglify:dev'
        ]);
    });

    /***** dev task *****/
    grunt.registerTask('dev', 'Task for development', function () {
        grunt.task.run([
            'clean:dev',
            // 'css:dev',
            'js:dev',
            'connect:server',
            'watch'
        ]);
    });

    grunt.registerTask('default', []);
};
