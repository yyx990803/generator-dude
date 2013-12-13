module.exports = function( grunt ) {

    grunt.initConfig({

        stylus: {
            build: {
                files: { 
                    'static/css/style.css': 'client/stylus/style.styl'
                }
            }
        },

        componentbuild: {
            build: {
                options: {
                    standalone: true,   
                },
                src: '.',
                dest: 'static/js'
            }
        },

        jshint: {
            build: {
                src: ['client/js/**/*.js'<% if (node) { %>, 'server/**/*.js'<% } %>],
                options: {
                    jshintrc: './.jshintrc'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'static/js/build.min.js': 'static/js/build.js'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            component: {
                files: ['client/js/**/*.js', 'component.json'],
                tasks: 'componentbuild'
            },
            stylus: {
                files: ['client/stylus/**/*.styl'],
                tasks: 'stylus',
                options: {
                    nospawn: true
                }
            }
        }<% if (basic) { %>,

        connect: {
            dev: {
                options: {
                    port: 8080,
                    base: 'static'
                }
            }
        }<% } %><% if (node) { %>,

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    watchedFolders: ['server']
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }<% } %>

    })

    grunt.loadNpmTasks( 'grunt-contrib-watch' )
    grunt.loadNpmTasks( 'grunt-contrib-stylus' )
    grunt.loadNpmTasks( 'grunt-contrib-uglify' )
    grunt.loadNpmTasks( 'grunt-contrib-jshint' )
    grunt.loadNpmTasks( 'grunt-component-build' )
<% if (basic) { %>
    grunt.loadNpmTasks( 'grunt-contrib-connect' )
    grunt.registerTask( 'dev', ['build', 'connect', 'watch'] )
<% } else if (node) { %>
    grunt.loadNpmTasks( 'grunt-nodemon' )
    grunt.loadNpmTasks( 'grunt-concurrent' )
    grunt.registerTask( 'dev', ['build', 'concurrent:dev'] )
<% } else if (appengine) { %>
    grunt.registerTask( 'dev', [ 'build', 'serve', 'watch' ] )
    grunt.registerTask( 'deploy', [ 'build', 'update' ] )

    grunt.registerTask('update', 'Update to Appengine.', function () {
        var done = this.async()
        grunt.util.spawn({
            cmd: 'appcfg.py',
            args: ['--oauth2', 'update','.'],
            opts: {
                stdio: 'inherit'
            }
        }, done)
    })

    grunt.registerTask('serve', 'Start development environment.', function() {
        var done = this.async()
        grunt.util.spawn({
            cmd: 'dev_appserver.py',
            args: ['./app.yaml'],
            opts: {
                stdio: 'inherit'
            }
        }, done)
    })
<% } %>
    grunt.registerTask( 'build', ['stylus', 'componentbuild', 'jshint', 'uglify'] )
    grunt.registerTask( 'default', ['build'])
    
}