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

        if (this.appengine) {
            this.internal = props.internal
            this.static   = props.static
        }

        if (this.node) {
            this.mongodb = props.mongodb
            this.redis   = props.redis
        }

        cb()
    }.bind(this))
}

DudeGenerator.prototype.app = function app() {
    
    this.directory('base', './')

    if (!this.appengine && !this.node) {
        this.template('index.html', 'static/index.html')
    } else if (this.node) {
        this.directory('node', './')
    } else if (this.appengine) {
        this.directory('appengine', './')
        this.static && this.template('index.html', 'static/index.html')
    }
}

DudeGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_jshintrc', '.jshintrc')
    this.copy('_gitignore', '.gitignore')
}