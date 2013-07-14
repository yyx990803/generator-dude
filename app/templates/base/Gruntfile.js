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
                verbose: true
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

            component: {
                files: ['client/js/**/*.js'],
                tasks: 'component_build',
                options: {
                    nospawn: true
                }
            },

            sass: {
                files: ['client/sass/**/*.sass'],
                tasks: 'sass:dev',
                options: {
                    nospawn: true,
                    livereload: true
                }
            }
        }<% if (node) { %>,

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

<% if (node) { %>
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

    grunt.registerTask('update', 'Deploy to appengine.', function() {
        grunt.util.spawn({
            cmd: 'appcfg.py',
            args: ['--oauth2', 'update', '.'],
            opts: {
                stdio: 'inherit'
            }
        }, function () {})
    })
<% } %>

    grunt.registerTask( 'build', ['sass:build', 'component_build', 'uglify'] )
    grunt.registerTask( 'default', ['build'])
    
}