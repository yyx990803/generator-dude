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
        }<%= nodeTaskConfigs %>

    })

    grunt.loadNpmTasks( 'grunt-contrib-watch' )
    grunt.loadNpmTasks( 'grunt-contrib-sass' )
    grunt.loadNpmTasks( 'grunt-contrib-uglify' )
    grunt.loadNpmTasks( 'grunt-component-build' )

    grunt.registerTask( 'build', ['sass:build', 'component_build', 'uglify'] )
    grunt.registerTask( 'default', ['build'])
    
<%= nodeTasks %><%= appengineTasks %>
}