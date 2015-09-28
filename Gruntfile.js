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
         * grunt-babel
         * https://github.com/babel/grunt-babel
         */
        babel: {
            options: {
                sourceMap: true
            },
            all: {
                files: {
                    '<%= config.tmp %>/scripts/master.js': '<%= config.tmp %>/scripts/master.js'
                }
            }
        },

        /**
         * grunt-bower-concat
         * https://github.com/sapegin/grunt-bower-concat
         */
        bower_concat: {
            preloads: {
                dest: '<%= config.tmp %>/scripts/libs/preload.js',
                include: ['modernizr']
            },
            libs: {
                dest: '<%= config.tmp %>/scripts/libs/vendors.js',
                // array of libraries to not include
                exclude: ['modernizr']
            }
        },

        /**
         * grunt-bowercopy
         * https://github.com/timmywil/grunt-bowercopy
         */
        bowercopy: {
            libs: {
                options: {
                    destPrefix: '<%= config.tmp %>/scripts/libs'
                },
                files: {
                    'jquery.js': 'jquery/dist/jquery.min.js',
                    'ember.js': 'ember/ember.js'
                }
            }
        },

        /**
         * grunt-contrib-clean
         * https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            dev: ['<%= config.tmp %>', '<%= config.dev %>']
        },

        /**
         * grunt-contrib-concat
         * https://github.com/gruntjs/grunt-contrib-concat
         */
        concat: {
            options: {},
            libs: {

            },
            custom: {
                files: {
                    '<%= config.tmp %>/scripts/master.js': [
                        '<%= config.app %>/scripts/{,*/}*.js',
                        '!<%= config.app %>/scripts/libs/*',
                        '!<%= config.app %>/scripts/compiled/*'
                    ]
                }
            }
        },

        /**
         * grunt-contrib-connect
         * https://github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            options: {
                port: 9001,
                hostname: '0.0.0.0',
                livereload: true
            },
            server: {
                options: {
                    // serve files from both the app and tmp folders
                    base: ['<%= config.app %>', '<%= config.tmp %>'],
                    open: true
                }
            }
        },

        /**
         * grunt-concurrent
         * https://github.com/sindresorhus/grunt-concurrent
         */
        concurrent: {
            dev: {},
            dist: {}
        },

        /**
         * grunt-contrib-copy
         */
        copy: {
            dev: {
                dest: '<%= config.dev %>/index.html',
                src: '<%= config.app %>/index.html'
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
         * grunt-open
         * https://github.com/jsoverson/grunt-open
         */
        // open: {
        //     server: {
        //         path: 'http://localhost:<%= connect.server.options.port %>'
        //     }
        // },

        /**
         * grunt-postcss
         * https://github.com/nDmitry/grunt-postcss
         */
        postcss: {
            dev: {
                options: {
                    map: {
                        inline: false
                    },
                    processors: [
                        require('autoprefixer-core')({browsers: ['last 2 version', 'ie 9']}),
                        require('cssnano')
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/css',
                    src: ['*.css'],
                    dest: '<%= config.tmp %>/css'
                }]
            }
        },

        /**
         * grunt-processhtml
         * https://github.com/dciccale/grunt-processhtml
         */
        processhtml: {

        },

        /**
         * grunt-sass
         * https://github.com/sindresorhus/grunt-sass
         */
        sass: {
            options: {
                sourceMap: true
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css/sass/',
                    src: ['*.scss'],
                    dest: '<%= config.tmp %>/css/',
                    ext: '.css'
                }]
            }
        },

        /**
         * grunt-sass-globbing
         * https://github.com/DennisBecker/grunt-sass-globbing
         */
        sass_globbing: {
            all: {
                files: {
                    '<%= config.app %>/css/sass/_modulesMap.scss': '<%= config.app %>/css/sass/modules/**/*'
                }
            }
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
                    screwIE8: true
                },
                files: {
                    '<%= config.tmp %>/scripts/master.js': [
                        '<%= config.app %>/scripts/{,*/}*.js',
                        '!<%= config.app %>/scripts/libs/*',
                        '!<%= config.app %>/scripts/compiled/*'
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
                tasks: ['sass:dev', 'postcss:dev']
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
        }
    });

    /***** dev task *****/
    grunt.registerTask('dev', [
        'clean:dev',
        'sass_globbing',
        'sass:dev',
        'postcss:dev',
        'eslint',
        'bower_concat:preloads',
        'bower_concat:libs',
        // 'uglify:dev',
        'concat',
        'babel',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('default', []);
};
