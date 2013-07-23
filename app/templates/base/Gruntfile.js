module.exports = function( grunt ) {

    grunt.initConfig({

        sass: {
            build: {
                options: {
                    style: 'compressed'
                },
                files: { 
                    'static/css/style.css': 'client/sass/style.sass'
                }
            },
            dev: {
                files: {
                    'static/css/style.css': 'client/sass/style.sass'
                }
            } 
        },

        component_build: {
            build: {
                output: './static/js/',
                styles: false,
                scripts: true,
                verbose: true,
                standalone: true
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
                tasks: 'component_build'
            },
            sass: {
                files: ['client/sass/**/*.sass'],
                tasks: 'sass:dev',
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
    grunt.loadNpmTasks( 'grunt-contrib-sass' )
    grunt.loadNpmTasks( 'grunt-contrib-uglify' )
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
    grunt.registerTask('serve', 'Start development environment.', function() {
        grunt.util.spawn({
            cmd: 'dev_appserver.py',
            args: ['./app.yaml'],
            opts: {
                stdio: 'inherit'
            }
        }, function () {})
    })
<% } %>

    grunt.registerTask( 'build', ['sass:build', 'component_build', 'uglify'] )
    grunt.registerTask( 'default', ['build'])
    
}