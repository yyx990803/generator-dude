# Generator-dude

A personal project generator for Yeoman.

## Usage
- Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`
- Clone this repo, then inside of it, `npm link`
- In an empty directory run: `yo dude` (yeah it's that awesome)
- After everything is done you should be able to build with `grunt`
- `grunt watch` will watch files for SASS and Component build.
- `grunt dev` will start a development server on 8080, and run `grunt watch` concurrently.

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

### For Google App Engine
- `yo dude appengine`
- deploy with `grunt deploy` (which runs `appcfp.py update .`)

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
