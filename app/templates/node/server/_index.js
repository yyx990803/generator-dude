var express = require('express'),
    http 	= require('http'),
    path 	= require('path'),
    hbs     = require('express3-handlebars')

var app = express()

app.configure(function(){
    app.set('views', __dirname + '/../views')
    app.engine('handlebars', hbs({ defaultLayout: 'main' }))
    app.set('view engine', 'handlebars')
    app.use(express.favicon())
    app.use(app.router)
    app.use(express.static(__dirname + '/../static'))
})

app.configure('development', function(){
    app.use(express.logger('dev'))
    app.use(express.errorHandler())
})

app.get('/', function(req, res){
    res.render('index', {
        title: 'test',
        message: 'Node/Express works!!!'
    })
})

module.exports = http.createServer(app)