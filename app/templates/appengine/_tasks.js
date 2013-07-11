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
