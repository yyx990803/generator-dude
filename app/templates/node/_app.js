var server = require('./server')
server.listen(process.env.PORT || 8080)
console.log('server running on ' + (process.env.PORT || 8080))