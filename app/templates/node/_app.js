var express = require('express'),
    http 	= require('http'),
    path 	= require('path'),
    hbs     = require('express3-handlebars')

var app = express()

app.configure(function(){
    app.set('views', __dirname + '/views')
    app.engine('handlebars', hbs({ defaultLayout: 'main' }))
    app.set('view engine', 'handlebars')
    app.use(express.favicon())
    app.use(app.router)
    app.use(express.static(path.join(__dirname, 'static')))
})

app.configure('development', function(){
    app.use(express.logger('dev'))
    app.use(express.errorHandler())
})

app.get('/', function(req, res){
    res.render('index', {
        title: '<%= appName %>',
        message: 'Node/Express works!'
    })
})

var server = http.createServer(app)
server.listen(process.env.PORT || 8080)

console.log('server running on ' + (process.env.PORT || 8080))