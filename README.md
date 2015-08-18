# Mirum Project Base
This repository contains a lot of files that can be used to start projects. It's mostly config files.

You can grab individual files as you need them or just use this repo as the root of your project.

Once you've started project it might not be a good idea to update any tools. This is because you can introduce bugs that could cause your development time to increase or QA have to do a new pass if compiled code has changed.

### Adding and Updating Libraries

If you would like to add or update a library please update the appropiate config file and submit a pull request. In the pull request describe why you would like to update the library.

### Local Environment Dependencies

There are some packages you'll need to install into your local environment.

* Node.js - http://nodejs.org/download/
* Bower - http://bower.io/
    * npm install -g bower
* Grunt.js - http://gruntjs.com/getting-started
    * npm install -g grunt-cli

## Setup

Clone this repo into the root directory of your new project. The two config files you'll want to customize are `package.json` and `bower.json`. In those files fill out the fields for Project Name and Version along with Description. If your project has a repo be sure to add that to the repository.url section.

There might be plugins or modules you don't want to included, especially in the `bowser.json` file. Simple delete the lines for the modules you don't want. After that it's just a matter of running a couple of install commands.

```sh
$ npm install
$ bowser install
```

The first command will install the node_modules from the `package.json` file for your Grunt tasks. The second command will download the libraries listed in `bowser.json` into a folder called `bower_components`. This folder will be placed in the root directory.

The node_modules and bower_components folders should never be committed into your repository. These folders are already in the `.gitignore` file.

## Sass
The preferred sass compiler is now [libsass](https://github.com/sass/libsass). Installing libsass is just a matter of cloning the git repo to a location on your machine. To compile your Sass files though you need a wrapper like sassc or node-sass.

sassC is what you'll want to use if compiling your Sass at the command line. More often though you'll be using the Grunt plugin, grunt-sass, which is included in the `package.json`

Installation instructions for sassC which includes libsass - https://github.com/sass/sassc#step-by-step


## Javascript

### Transpilers

#### [Babel](https://babeljs.io/)

Babel is what is used to write ES6 and have it be able to run in browsers that don't fully support ES6 yet. Babel will take ES6 code and transform it into ES5.

If you need to compile javascript in your terminal you'll need to install the CLI version.

```
npm install -g babel
```

More than likely you'll be doing it all through a Grunt task using `grunt-babel`.

### Linters

#### [ESLint](http://eslint.org/)

ESLint is the preferred lint for javascript. It allows for more finely tuned js lint because it allows for both warnings and errors.

##### Installation

`npm install -g eslint`

##### Usage

Use the `.eslintrc` file and put it in your project's root. There is a grunt file that will

#### [JSHint](http://jshint.com/)

Place the `.jshintrc` file in the root of your project

