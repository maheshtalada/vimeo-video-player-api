var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

// Gruntfile.js
module.exports = function(grunt) {

    // Configure
    grunt.initConfig({

        working_base_folder: 'example',

        // Dev
        dev_base_folder: 'example',
        dev_server_port: 9001,


        // ---

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! ' + [
            '<%= pkg.description %> v<%= pkg.version %>',
            'Copyright (c) <%= grunt.template.today("yyyy") %>',
            '<%= grunt.template.today("ddd, dd mmm yyyy HH:MM:ss Z") %>'
            ].join(' | ') + ' */',


        // Watch task.
        watch: {
            options: {
                livereload: true,
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [
                    'default',
                ],
            },
            scripts: {
                files: [
                    '<%= working_base_folder %>/videoplayerAPI.js',
                ],
                tasks: [
                    'default',
                ],
            },
        },


        jshint: {
            options: {
                camelcase: true,
                forin: true,
                curly: true,
                eqeqeq: false,
                eqnull: false,
                camelcase: true,
                forin: false,
                undef: true,
                globals: {
                    jQuery: true,
                    '$': true,
                    "TWM": true,
                    "window" :true ,
                    "error" : true,
                    "document" : true,
                    "console" : true,
                    "setTimeout" : true,
                    "$f" : true ,
                },
            },
            beforeconcat: [
                '<%= working_base_folder %>/videoplayerAPI.js',
            ],

        },

        connect: {
            dev: {
                options: {
                    middleware: function (connect, options) {
                        return [
                            // proxySnippet,
                            require('connect-livereload')(),
                            connect.static(options.base),
                            connect.directory(options.base),
                        ];
                    },
                    port: '<%= dev_server_port %>',
                    base: '<%= dev_base_folder %>',
                },
            },
        },

        open: {
            dev: {
                path: 'http://localhost:<%= dev_server_port %>',
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-banner');

    // Default task
    grunt.registerTask('default', 'runs my tasks', function () {
        var tasks = [
            'jshint:beforeconcat',
        ];

        // always use force when watching
        grunt.option('force', true);
        grunt.task.run(tasks);
    });

    grunt.registerTask('start', [
        'default',
        'open:dev',
        'connect:dev',
        'watch',
    ]);

};
