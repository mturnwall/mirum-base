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
                    // serve files from both the app and dev folders
                    base: ['<%= config.app %>', '<%= config.dev %>'],
                    open: true
                }
            }
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
                    dest: '<%= config.dev %>/css'
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
                    '<%= config.dev %>/scripts/master.js': [
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
                tasks: ['eslint', 'uglify:dev']
            },
            html: {
                files: [
                    '<%= config.app %>/*.html'
                ]
            }
        }
    });

    /**
     * ***** dev task *****
     *
     * clean tmp and dev folders
     * css
     *     - run globbing on main scss files
     *     - compile sass files
     *     - run through autoprefixer
     *     - generate sourcemap
     * javascript
     *     - move vendor files from bower to tmp/vendor folder
     *     - concat files vendor files
     *     - concate project specific files
     *     - generate sourcemap
     * open site in web browser
     * start watch task
     */
    grunt.registerTask('dev', [
        'clean:dev',
        'sass_globbing',
        'sass:dev',
        'postcss:dev',
        'eslint',
        'uglify:dev',
        'connect:server',
        // 'open:server',
        'watch'
    ]);

    grunt.registerTask('default', []);
};
