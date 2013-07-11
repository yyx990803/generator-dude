var util = require('util'),
    path = require('path'),
    exec = require('child_process').exec,
    yeoman = require('yeoman-generator')

var BasicGenerator = module.exports = function BasicGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments)

    this.appengine = args[0] === 'appengine'
    this.node = args[0] === 'node'

    this.on('end', function () {
        var yo = this
        exec('component install', function (err, stdout, stderr) {
            if (stdout) console.log(stdout)
            if (stderr) console.log(stderr)
            if (err) {
                console.log('exec error: ' + err)
            } else {
                yo.installDependencies({
                    bower: false
                })
            }
        })
    })

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')))
}

util.inherits(BasicGenerator, yeoman.generators.Base)

BasicGenerator.prototype.askFor = function askFor() {
    var cb = this.async()

    console.log("\n=== Whatuuuuup, dude! ===\n")

    var prompts = [
        {
            name: 'appName',
            message: 'What\'s the name of this app?'
        }
    ]

    if (this.appengine) {
        prompts = prompts.concat([
            {
                type: 'confirm',
                name: 'internal',
                message: 'Is this an internal app?',
                default: true
            },
            {
                type: 'confirm',
                name: 'static',
                message: 'Is this a static app?',
                default: false
            }
        ])
    } else if (this.node) {
        prompts = prompts.concat([
            {
                type: 'confirm',
                name: 'mongodb',
                message: 'Use MongDB?',
                default: false
            },
            {
                type: 'confirm',
                name: 'redis',
                message: 'Use Redis?',
                default: false
            }
        ])
    }

    this.prompt(prompts, function (props) {
        this.appName = props.appName
        this.internal = props.internal
        this.static = props.static

        this.appengineTasks = ''
        this.nodeTasks = ''

        if (this.appengine) {
            this.appengineTasks = this.read('appengine/_tasks.js')
        }

        if (this.node) {
            this.nodeTasks = this.read('node/_tasks.js')
        }

        cb()
    }.bind(this))
}

BasicGenerator.prototype.app = function app() {
    this.mkdir('client')
    this.mkdir('client/js')
    this.mkdir('client/sass')

    this.mkdir('static')
    this.mkdir('static/js')
    this.mkdir('static/css')
    this.mkdir('static/img')

    this.write('client/js/main.js', "document.querySelector('h1').innerHTML = 'It works!'")
    this.write('client/sass/style.sass', 'body\n  font-family: "Helvetica Neue"')

    this.template('_package.json', 'package.json')
    this.template('_component.json', 'component.json')
    this.template('_Gruntfile.js', 'Gruntfile.js')

    if (!this.appengine && !this.node) {
        this.template('_index.html', 'static/index.html')
    } else if (this.appengine) {
        // App Engine
        this.template('appengine/_app.yaml', 'app.yaml')
        if (this.static) {
            this.template('_index.html', 'static/index.html')
        } else {
            this.mkdir('templates')
            this.template('appengine/_index.tmpl', 'templates/index.tmpl')
            this.template('appengine/_index.py', 'index.py')
        }
    } else if (this.node) {

    }
}

BasicGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_jshintrc', '.jshintrc')
    this.copy('_gitignore', '.gitignore')
}