	grunt.loadNpmTasks( 'grunt-nodemon' )
    grunt.loadNpmTasks( 'grunt-concurrent' )
	grunt.registerTask( 'dev', ['build', 'concurrent:dev'] )