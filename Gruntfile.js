'use strict';
// var LIVERELOAD_PORT = 35729;
// var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
// var mountFolder = function (connect, dir) {
//     return connect.static(require('path').resolve(dir));
// };

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
            dev: ['<%= config.tmp %>', '<%= config.dev %>']
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
        'postcss:dev'
    ]);

    grunt.registerTask('default', []);
};
