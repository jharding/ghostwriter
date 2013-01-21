[![build status](https://secure.travis-ci.org/jharding/ghostwriter.png?branch=master)](http://travis-ci.org/jharding/ghostwriter)

Ghostwriter
===========

Ghostwriter is a JavaScript library that provides a simple API for programmatically interacting with `input[type="text"]` and `textarea` elements. Give Ghostwriter the element you'd like to interact with along with a set of instructions that detail the interaction and Ghostwriter will take care of the rest. It's quite neat.

Download
--------

Ghostwriter hasn't been released yet. If you'd like to get a copy of the bleeding-edge version, do the following:

```
$ git clone git://github.com/jharding/ghostwriter.git
$ cd ghostwriter
$ npm install
$ npm install -g grunt-cli
$ grunt
```

This will build *ghostwriter.js* and *ghostwriter.min.js* in the root of the repo.

Vocab
-----

Quick overview of some Ghostwriter vocab.

* **haunt** *(verb)* - to programmatically interact with.
* **stroke** *(noun)* - action that is taken upon a haunted element.
* **manuscript** *(noun)*  - ordered collection of strokes that make up a haunting.

Usage
-----

### Options

The available options that can be passed to `ghostwriter#haunt`.

* `loop` - If truthy, when a haunting ends, it will automatically start up again from the beginning. Defaults to `false`.

* `interval` - The number of milliseconds between the execution of strokes. Defaults to `300`.

* `input` - A single `input[type="text"]` or `textarea` element to haunt. Can be a CSS selector, DOM element, or a jQuery-wrapped DOM element. This is a **required** option.


* `manuscript` - The ordered collection of strokes that will be executed throughout a haunting. If you are using non-character strokes, `manuscript` should be an array of strokes. If you are only using character strokes though, a string is acceptable. More details about strokes can be found in the [Strokes section][strokes]. This is a **required** option.

### API

#### ghostwriter.haunt(options)

Returns a Ghost instance. `options` is expected to be an options object, an overview of the available options can be found in the [Options section][options].

```javascript
var ghost = ghostwriter.haunt({
  input: '.haunted-input'
, manuscript: 'i am haunted'
});
```

#### Ghost#start()

Starts/resumes the haunting of the input. Can be paused by calling `Ghost#pause`

#### Ghost#pause()

Pauses the haunting of  the input. Can be resumed by calling `Ghost#start`.

#### Ghost#stop()

Stops and resets the haunting of the input. The original value of the input will be restored.

#### Ghost#restart()

Equivalent to calling `Ghost#stop` and then `Ghost#start`.

#### Ghost#reset()

Restores the original value of the input. Only useful for cleanup after a haunting finishes.

### Custom jQuery Events

Ghosts trigger a variety of jQuery events on their input during the life-cycle of a haunting.

* `ghostwriter:start` - Triggered when a haunting is started from the beginning.

* `ghostwriter:resume` - Triggered when a haunting is resumed after being paused.

* `ghostwriter:pause` - Triggered when a haunting is paused.

* `ghostwriter:stop` - Triggered when a haunting is stopped.

* `ghostwriter:finish` - Triggered when a haunting finishes.

Strokes
-------

Ghosts rely on manuscripts to determine how they should haunt inputs. Manuscripts are composed of an ordered collection of strokes. There are many different types of strokes and each type has its own definition which details what should happen when it's executed. Stroke definitions are maintained in [src/stroke_definitions.js][stroke_definitions].

### Available Strokes

Strokes that don't take any arguments don't need to be invoked before they are added to a manuscript. Along with the actions listed in their description, each stroke should trigger the expected DOM events when they are executed unless otherwise noted.

* `ghostwriter.character(char)` - Enters `char` into the input at the current cursor position.
* `ghostwriter.backspace` - Moves the cursor one position backwards and deletes the character at that position.
* `ghostwriter.left` - Moves the cursor one position backwards.
* `ghostwriter.right` - Moves the cursor one position forward.
* `ghostwriter.up`
* `ghostwriter.down`
* `ghostwriter.enter`
* `ghostwriter.tab`
* `ghostwriter.esc`
* `ghostwriter.selectAll` - Selects all of the text in the input. Does not trigger any DOM events.
* `ghostwriter.deleteSelection` - Deletes the selected text within the input.
* `ghostwriter.trigger(eventType)` - Triggers `eventType` jQuery event on the input.
* `ghostwriter.noop`

### Repeating Strokes

Strokes have a convenience method attached to them to make repeating them dead simple. The following examples are equivalent.

```javascript
var bad = ghostwriter.haunt({
  input: '.i-am-an-input'
, manuscript: [
    ghostwriter.character('z')
  , ghostwriter.character('z')
  , ghostwriter.character('z')
  , ghostwriter.backspace
  , ghostwriter.backspace
  , ghostwriter.backspace
  ]
});

var good = ghostwriter.haunt({
  input: '.i-am-an-input'
, manuscript: [
    ghostwriter.character('z').repeat(3)
  , ghostwriter.backspace.repeat(3)
  ]
});
```

### Character Strokes the Easy Way

If a string is found in a manuscript, Ghostwriter will split the string and turn each character into a character stroke. The following examples are equivalent.

```javascript
var bad = ghostwriter.haunt({
  input: '.i-am-an-input'
, manuscript: [
    ghostwriter.character('c')
  , ghostwriter.character('a')
  , ghostwriter.character('s')
  , ghostwriter.character('p')
  , ghostwriter.character('e')
  , ghostwriter.character('r')
  ]
});

var good = ghostwriter.haunt({
  input: '.i-am-an-input'
, manuscript: ['casper']
});

var alsoGood = ghostwriter.haunt({
  input: '.i-am-an-input'
, manuscript: 'casper'
});
```

Example
-------

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="https://raw.github.com/jharding/ghostwriter/master/ghostwriter.js"></script>
  </head>
  <body>
    <input class="haunt-me" type="text">

    <script>
      var ghost = ghostwriter.haunt({
        input: '.haunt-me'
      , manuscript: [
          'boo!'
        , ghostwriter.backspace.repeat(4)
        , 'sorry if i startled you'
        , ghostwriter.selectAll
        , ghostwriter.deleteSelection
        , 'i am actually quite friendly'
        ]
      });

      ghost.start();
    </script>
  </body>
</hmtl>
```

Testing
-------

Haven't gotten around to writing a test suite yet :(

Issues
------

Found a bug? Create an issue on GitHub.

https://github.com/jharding/ghostwriter/issues


Developers
----------

If you plan on contributing to Ghostwriter, be sure to read the [contributing guidelines][contributing-guidelines]. 

In order to build and test Ghostwriter, you'll need to install Ghostwriter's devDependencies (`$ npm install`) and have [grunt-cli][grunt-cli] installed. Below is an overview of Ghostwriter's Grunt tasks that'll be useful in development.

* `grunt build` - Builds *ghostwriter.js* from source files.
* `grunt lint` - Runs source and test files through JSHint.
* `grunt test` - Runs the test suite with PhantomJS.
* `grunt test:browser` - Runs the test suite in your default browser.
* `grunt watch` - Rebuilds *ghostwriter.js* whenever a source file is modified.

Versioning
----------

For transparency and insight into the release cycle, releases will be numbered with the follow format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on semantic versioning, please visit http://semver.org/.

License
-------

Copyright (c) 2013 [Jake Harding](http://thejakeharding.com)  
Licensed under the MIT License.

[strokes]: https://github.com/jharding/ghostwriter#strokes
[options]: https://github.com/jharding/ghostwriter#options
[stroke_definitions]: https://github.com/jharding/ghostwriter/blob/master/src/stroke_definitions.js
[contributing-guidelines]: https://github.com/jharding/ghostwriter/blob/master/CONTRIBUTING.md
[grunt-cli]: https://github.com/gruntjs/grunt-cli
