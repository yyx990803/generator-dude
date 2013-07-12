var util = require('util'),
    path = require('path'),
    exec = require('child_process').exec,
    yeoman = require('yeoman-generator')

var DudeGenerator = module.exports = function DudeGenerator(args, options, config) {
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

util.inherits(DudeGenerator, yeoman.generators.Base)

DudeGenerator.prototype.askFor = function askFor() {
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
        this.appengineTasks = ''
        this.nodeTasks = ''
        this.nodeDeps = ''

        if (this.appengine) {
            this.internal = props.internal
            this.static = props.static
            this.appengineTasks = this.read('appengine/_tasks.js')
        }

        if (this.node) {
            this.nodeTasks = this.read('node/_tasks.js')
            this.nodeTaskConfigs = this.read('node/_taskconfigs.js')
            this.nodeDevDeps = this.read('node/_devdeps.json')
            var nodeDeps = {
                "express": "~3.3.4",
                "express3-handlebars": "~0.4.1"
            }
            if (props.mongodb) nodeDeps["mongodb"] = "~1.3.11"
            if (props.redis) nodeDeps["redis"] = "~0.8.4"
            this.nodeDeps = ('"dependencies": ' + JSON.stringify(nodeDeps, null, 4) + ',').replace(/\n/g, '\n    ')
        }

        cb()
    }.bind(this))
}

DudeGenerator.prototype.app = function app() {
    this.mkdir('client')
    this.mkdir('client/js')
    this.mkdir('client/sass')

    this.mkdir('static')
    this.mkdir('static/js')
    this.mkdir('static/css')
    this.mkdir('static/img')

    this.write('client/js/main.js', "document.querySelector('h1').innerHTML = 'Grunt and Component works!'")
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
        // Node
        this.mkdir('server')
        this.mkdir('views/layouts')
        this.copy('node/_podhook', '.podhook')
        this.copy('node/server/_index.js', 'server/index.js')
        this.copy('node/_app.js', 'app.js')
        this.template('node/_index.handlebars', 'views/index.handlebars')
        this.template('node/_main_layout.handlebars', 'views/layouts/main.handlebars')
    }
}

DudeGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_jshintrc', '.jshintrc')
    this.copy('_gitignore', '.gitignore')
}