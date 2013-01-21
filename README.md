[![build status](https://secure.travis-ci.org/jharding/ghostwriter.png?branch=master)](http://travis-ci.org/jharding/ghostwriter)

Ghostwriter
===========

Ghostwriter is a JavaScript library that provides a simple API for programmatically interacting with `input[type="text"]` elements. Give Ghostwriter the element you'd like to interact with along with a set of instructions that detail the interaction and Ghostwriter will take care of the rest. It's quite neat.

Download
--------

* **Development (0.1.0)** - [ghostwriter.js][ghostwriter.js] 
* **Production (0.1.0)** - [ghostwriter.min.js][ghostwriter.min.js] *~1.6KB, compressed and gzipped*

Usage
-----

### Options

The available options that can be passed to `ghostwriter#haunt`.

* `loop` - If truthy, when a haunt finishes, it will automatically start up again from the beginning. Defaults to `false`.

* `interval` - The number of milliseconds between the execution of strokes. Defaults to `300`.

* `input` - The `input[type="text"]` element to haunt. Can be a CSS selector, DOM element, or a jQuery-wrapped DOM element. **Required**.


* `manuscript` - The ordered collection of strokes that will be executed during a haunt. If you are using non-character strokes, `manuscript` should be an array of strokes. If you are only using character strokes though, a string is acceptable. More details about strokes can be found in the [strokes section][strokes]. **Required**.

### API

#### ghostwriter.haunt(options)

Returns a Haunt instance. `options` is expected to be an options object (ahem, [omnihash][omnihash]), an overview of the available options can be found in the [options section][options].

```javascript
var haunt = ghostwriter.haunt({
  input: '.haunted-input'
, manuscript: 'i am haunted'
});
```

#### Haunt#start()

Starts/resumes the haunt. Can be paused by calling `Haunt#pause`

#### Haunt#pause()

Pauses the haunt. Can be resumed by calling `Haunt#start`.

#### Haunt#stop()

Stops the haunt, resets the haunt, and blurs the input. The original value of the input will be restored.

#### Haunt#restart()

Equivalent to calling `Haunt#stop` and then `Haunt#start`.

#### Haunt#reset()

Restores the original value of the input. Only useful for cleanup after a haunt finishes.

### Custom jQuery Events

During the life-cycle of a haunt, a number of jQuery events are triggered on the haunted input.

* `ghostwriter:start` - Triggered when the haunt starts.

* `ghostwriter:resume` - Triggered when the haunt resumes after being paused.

* `ghostwriter:pause` - Triggered when the haunt pauses.

* `ghostwriter:stop` - Triggered when the haunt stops.

* `ghostwriter:finish` - Triggered when the haunt finishes.

Strokes
-------

Haunts rely on manuscripts to determine how they should interact with inputs. Manuscripts are an ordered collection of strokes. There are many different types of strokes and each type has its own definition which details what should happen when it's executed. Stroke definitions are maintained in [src/stroke_definitions.js][stroke_definitions].

### Available Strokes

Strokes that don't take any arguments don't need to be invoked before they are added to a manuscript. Along with the actions listed in their description, each stroke should trigger the expected DOM events when they are executed unless otherwise noted.

* `ghostwriter.character(char)` - If no text is selected, enters `char` into the input at the current cursor position. If text is selected, replaces the selected text with `char`.
* `ghostwriter.backspace` - If no text is selected, moves the cursor one position backward and deletes the character at that position. If text is selected, removes the selected text.
* `ghostwriter.left` - If no text is selected, moves the cursor one position left. If text is selected, moves the cursor to the left end of the selected text and deselects the text.
* `ghostwriter.right` - If no text is selected, moves the cursor one position right. If text is selected, moves the cursor to the right end of the selected text and deselects the text.
* `ghostwriter.up`
* `ghostwriter.down`
* `ghostwriter.enter`
* `ghostwriter.tab`
* `ghostwriter.esc`
* `ghostwriter.selectLeft` - Extends selection one character to the left. Does not trigger any DOM events.
* `ghostwriter.selectRight` - Extends selection one character to the right. Does not trigger any DOM events.
* `ghostwriter.selectAll` - Selects all of the text in the input. Does not trigger any DOM events.
* `ghostwriter.trigger(eventType)` - Triggers `eventType` jQuery event on the input.
* `ghostwriter.noop` - Does nothing.

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
        , ghostwriter.backspace
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

Tests are written using [Jasmine][jasmine]. To run Ghostwriter's test suite with PhantomJS, run `npm test`.

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

[ghostwriter.js]: https://github.com/jharding/ghostwriter/blob/master/ghostwriter.js
[ghostwriter.min.js]: https://github.com/jharding/ghostwriter/blob/master/ghostwriter.min.js
[strokes]: https://github.com/jharding/ghostwriter#strokes
[omnihash]: https://twitter.com/JakeHarding/status/292165937250041857
[options]: https://github.com/jharding/ghostwriter#options
[stroke_definitions]: https://github.com/jharding/ghostwriter/blob/master/src/stroke_definitions.js
[jasmine]: http://pivotal.github.com/jasmine/
[contributing-guidelines]: https://github.com/jharding/ghostwriter/blob/master/CONTRIBUTING.md
[grunt-cli]: https://github.com/gruntjs/grunt-cli
