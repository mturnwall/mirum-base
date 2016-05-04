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
         * grunt-assemble
         * https://github.com/assemble/grunt-assemble
         */
        assemble: {
            options: {
                layoutdir: '<%= config.app %>/templates/layouts',
                partials: '<%= config.app %>/templates/partials/**/*.hbs',
                flatten: true
            },
            dev: {
                options: {
                    layout: 'default.hbs'
                },
                files: {
                    '<%= config.dev %>/': ['<%= config.app %>/templates/pages/*.hbs']
                }
            },
            dist: {
                options: {
                    layout: 'default.hbs'
                },
                files: {
                    '<%= config.dist %>/': ['<%= config.app %>/templates/pages/*.hbs']
                }
            }
        },

        /**
         * grunt-contrib-clean
         * https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            dev: ['<%= config.tmp %>', '<%= config.dev %>'],
            dist: ['<%= config.dist %>']
        },

        /**
         * grunt-contrib-concat
         * https://github.com/gruntjs/grunt-contrib-concat
         */
        concat: {
            options: {},
            custom: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= config.dist %>/includes/jsbin/<%= pkg.name %>.min.js': [
                        '<%= config.app %>/scripts/{,*/}*.js',
                        '!<%= config.app %>/scripts/libs/*',
                        '!<%= config.app %>/scripts/compiled/*'
                    ]
                }
            },
            dev: {
                files: {
                    '<%= config.dev %>/includes/jsbin/vendors.js': [
                        '<%= config.app %>/scripts/libs/*.js'
                    ],
                    '<%= config.dev %>/includes/jsbin/preload.js': [
                        '<%= config.app %>/scripts/preload/*.js'
                    ]
                }
            },
            dist: {
                files: {
                    '<%= config.dist %>/includes/jsbin/vendors.js': [
                        '<%= config.app %>/scripts/libs/*'
                    ],
                    '<%= config.dist %>/includes/jsbin/preload.js': [
                        '<%= config.app %>/scripts/preload/*.js'
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
                port: 9002,
                hostname: '0.0.0.0',
                livereload: true,
                debug: true
            },
            server: {
                options: {
                    base: ['<%= config.dev %>', '<%= config.app %>'],
                    open: true
                }
            }
        },

        /**
         * grunt-contrib-copy
         */
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/fonts',
                    src: ['*'],
                    dest: '<%= config.dist %>/fonts'
                }]
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
         * grunt-contrib-imagemin
         * https://github.com/gruntjs/grunt-contrib-imagemin
         */
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/media',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.dist %>/media'
                }]
            }
        },

        /**
         * grunt-jsdoc
         * https://github.com/krampstudio/grunt-jsdoc
         */
        jsdoc: {
            docs: {
                options: {
                    configure: './conf.json',
                    private: true
                },
                src: [
                    '<%= config.app %>/scripts/{,*/}*.js',
                    '!<%= config.app %>/scripts/libs/*',
                    '!<%= config.app %>/scripts/preload/*',
                    '!<%= config.app %>/scripts/compiled/*'
                ]
            }
        },

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
                        require('autoprefixer-core')({browsers: ['last 2 version', 'ie 9']})
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dev %>/css',
                    src: ['*.css'],
                    dest: '<%= config.dev %>/css'
                }]
            },
            dist: {
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
                    cwd: '<%= config.dist %>/css',
                    src: ['*.css'],
                    dest: '<%= config.dist %>/css'
                }]
            }
        },

        /**
         * grunt-text-replace
         * https://github.com/yoniholmes/grunt-text-replace
         */
        replace: {
            // Fixes paths in the source maps so they actually work
            sourceMaps: {
                src: ['<%= config.dev %>/scripts/*.map', '<%= config.dev %>/css/*.map'],
                overwrite: true,
                replacements: [{
                    from: /..\/..\/(app|.tmp)/g,
                    to: ''
                }]
            }
        },

        /**
         * grunt-sass
         * https://github.com/sindresorhus/grunt-sass
         */
        sass: {
            dev: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/sass/',
                    src: ['*.scss'],
                    dest: '<%= config.dev %>/css/',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/sass/',
                    src: ['*.scss'],
                    dest: '<%= config.dist %>/css/',
                    ext: '.css'
                }]
            }
        },

        /**
         * grunt-sass
         * https://github.com/sindresorhus/grunt-sass
         */
        sassdoc: {
            all: {
                options: {
                    dest: './sassdocs',
                    descriptionPath: './README.md',
                    groups: {
                        fonts: 'Fonts',
                        colors: 'Colors',
                        buttons: 'Buttons',
                        ui: 'UI'
                    },
                    theme: 'flippant'
                },
                src: '<%= config.app %>/sass/'
            }
        },

        /**
         * grunt-sass-globbing
         * https://github.com/DennisBecker/grunt-sass-globbing
         */
        sass_globbing: {
            all: {
                files: {
                    '<%= config.app %>/sass/_modulesMap.scss': '<%= config.app %>/css/sass/modules/**/*'
                }
            }
        },

        /**
         * grunt-contrib-uflify
         * https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            dist: {
                options: {
                    preserveComments: 'some',
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }
                },
                files: {
                    '<%= config.dist %>/scripts/<%= pkg.name %>.min.js': [
                        '<%= config.dist %>/scripts/<%= pkg.name %>.js'
                    ]
                }
            }
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
                tasks: ['eslint', 'webpack:dev']
            },
            assemble: {
                files: [
                    '<%= config.app %>/templates/**/*.hbs'
                ],
                tasks: ['assemble']
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
            dev: {
                devtool: 'source-map',
                output: {
                    path: '<%= config.dev %>/scripts/',
                    filename: '<%= pkg.name %>.js'
                },
                progress: true,
                debug: true
            },
            dist: {
                output: {
                    path: '<%= config.dist %>/scripts/',
                    filename: '<%= pkg.name %>.js'
                }
            }
        }

    });

    grunt.registerTask('css', 'Compile Sass', function (target) {
        grunt.task.run([
            'sass_globbing',
            'sass:' + target,
            'postcss:' + target
        ]);
        if (target === 'dev') {
            grunt.task.run([
                'replace:sourceMaps'
            ]);
        }
    });

    grunt.registerTask('js', 'Compile javascript', function js(target) {
        grunt.task.run([
            'eslint',
            'webpack:' + target
        ]);
        if (target === 'dist') {
            grunt.task.run([
                'uglify:dist'
            ]);
        }
    });

    /***** dev task *****/
    grunt.registerTask('dev', 'Task for development', function () {
        grunt.task.run([
            'clean:dev',
            'assemble',
            'css:dev',
            'js:dev',
            'assemble:dev',
            'connect:server',
            'watch'
        ]);
    });

    /***** dev task *****/
    grunt.registerTask('build', 'Task for building release', function () {
        grunt.task.run([
            'clean:dist',
            'css:dist',
            'js:dist',
            'assemble:dist',
            'copy:dist',
            'imagemin'
        ]);
    });

    grunt.registerTask('default', []);
};
