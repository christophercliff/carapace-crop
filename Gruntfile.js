var path = require('path')

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-mocha')
    grunt.loadNpmTasks('grunt-mocha-test')

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            test: {
                options: {
                    debug: true
                },
                src: './test/browser.js',
                dest: './test/runner/index.js'
            }
        },
        connect: {
            test: {
                options: {
                    base: path.resolve(__dirname, './test/runner/')
                }
            }
        },
        copy: {
            mocha: {
                files: [
                    {
                        src: path.resolve(__dirname, './node_modules/grunt-mocha/node_modules/mocha/mocha.js'),
                        dest: path.resolve(__dirname, './test/runner/mocha.js')
                    },
                    {
                        src: path.resolve(__dirname, './node_modules/grunt-mocha/node_modules/mocha/mocha.css'),
                        dest: path.resolve(__dirname, './test/runner/mocha.css')
                    }
                ]
            }
        },
        jshint: {
            options: {
                eqeqeq: true,
                immed: true,
                latedef: 'nofunc',
                newcap: true,
                quotmark: 'single',
                trailing: true,
                unused: true,
                asi: true,
                boss: true,
                expr: true,
                laxbreak: true,
                laxcomma: true,
                scripturl: true,
                sub: true,
                loopfunc: true
            },
            all: [
                './Gruntfile.js',
                './lib/**/*.js',
                './test/browser.js',
                './test/server.js'
            ]
        },
        mocha: {
            browser: {
                options: {
                    run: true,
                    reporter: 'Spec',
                    log: true,
                    urls: ['http://127.0.0.1:8000/']
                }
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            server: {
                src: ['./test/server.js']
            }
        }
    })

    grunt.registerTask('test:server', [
        'jshint:all',
        'mochaTest:server'
    ])

    grunt.registerTask('test:browser', [
        'jshint:all',
        'browserify:test',
        'copy:mocha',
        'connect:test',
        'mocha:browser'
    ])

    grunt.registerTask('test', [
        'test:browser',
        'test:server'
    ])

};
