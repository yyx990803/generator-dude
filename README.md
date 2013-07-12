# Generator-dude

A personal project generator using [Yeoman](http://yeoman.io).
This is heavily tailored for my personal needs and preferences, but feel free to fork it.

## Front End Stack
- [SASS](https://github.com/nex3/sass)
- [Component](https://github.com/component/component)

## Usage
- Make sure you have [yo](https://github.com/yeoman/yo) and [grunt-cli](https://github.com/gruntjs/grunt-cli) installed: `npm install -g yo grunt-cli`
- Clone this repo, place it somewhere nice, then inside of it, `npm link`
- In an empty directory run: `yo dude` (yeah it's that awesome)
- The project is ready to roll. Just `grunt` to build.
- If you initiated with Node or AppEgine backend (see below), `grunt dev` will build everything, start a development server on 8080, and watch file changes for auto rebuild.

## Includes
- grunt
- grunt-contrib-watch
- grunt-contrib-sass
- grunt-contrib-uglify
- grunt-component-build
- .gitignore
- .jshintrc

### For Node
- `yo dude node`
- grunt-concurrent
- grunt-nodemon
- express
- express3-handlebars
- redis (optional)
- mongodb (optional)
- .podhook (see [Pod](https://github.com/yyx990803/pod))

### For Google App Engine
- `yo dude appengine`
- deploy with `grunt deploy` (which runs `appcfp.py update .`)

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)