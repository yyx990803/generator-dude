var util = require('util'),
    path = require('path'),
    exec = require('child_process').exec,
    yeoman = require('yeoman-generator')

var DudeGenerator = module.exports = function DudeGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments)

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

    // have Yeoman greet the user.
    console.log(this.yeoman)

    var prompts = [
        {
            name: 'appName',
            message: 'What\'s the name of this app?'
        }
    ]

    this.prompt(prompts, function (props) {
        this.appName = props.appName

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

    this.write('client/js/main.js', "document.querySelector('h1').innerHTML = 'It works!'")
    this.write('client/sass/style.sass', 'body\n  font-family: "Helvetica Neue"')

    this.template('_index.html', 'index.html')
    this.template('_package.json', 'package.json')
    this.template('_component.json', 'component.json')
    this.copy('_Gruntfile.js', 'Gruntfile.js')
}

DudeGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_jshintrc', '.jshintrc')
    this.copy('_gitignore', '.gitignore')
}