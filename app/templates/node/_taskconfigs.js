,

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
        }