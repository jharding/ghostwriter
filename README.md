[![build status](https://secure.travis-ci.org/jharding/ghostwriter.png?branch=master)](http://travis-ci.org/jharding/ghostwriter)

Ghostwriter
===========

Ghostwriter is a library for haunting your web page, specifically input[type="test"] and textareas on your web page. You provide Ghostwriter the element to haunt along with a set of instructions detailing the haunting (`manuscript`) and Ghostwriter will take care if the rest. It's quite neat.

Download
--------

**Dependencies:** Ghostwriter requires jQuery 1.7+.

* development: [ghostwriter.js][ghostwriter.js]
* production(minified): [ghostwriter.min.js][ghostwriter.js]


Usage
-----

### Options

#### loop

If `loop` is a truthy value, when a haunting ends, it will automatically start up again. Defaults to `false`.

#### input

The input or textarea element to haunt. Can be a CSS selector, DOM element, or a jQuery-wrapped DOM element. This is a **required** option.

#### interval

The number of milliseconds between strokes. Defaults to `300`.

#### manuscript

The collection of strokes the ghost will execute. If you are using non-character strokes, `manuscript` should be an array of strokes. If you are only using character strokes though, a string is acceptable. This is a **required** option.

### API

#### ghostwriter.haunt(options)

Returns a Ghost instance. `options` is expect to be an options hash, an overview of the available options can be found [here][options].

```javascript
var ghost = ghostwriter.haunt({
  input: '.haunted-input'
, manuscript: 'i am haunted'
});
```

#### Ghost#start()

Starts/resumes the haunting of the input. Can be paused by calling `Ghost#pause`

#### Ghost#pause()

Pauses the haunting of the input. Can be resumed by calling `Ghost#start`.

#### Ghost#stop()

Stops and resets the haunting of the input. The original value of the input will be restored.

#### Ghost#restart()

Equivalent to calling `Ghost#stop` and then `Ghost#start`.

### Strokes

The way you describe hauntings to Ghostwriter is through strokes. There are character strokes and non-character strokes. When a stroke is executed, it'll update the DOM accordingly and trigger the corresponding DOM events. 

Character strokes represent one character that will be entered into the input. Strings are automatically decomposed into character strokes, so for the most part, you don't need to know much about character strokes.

Non-character strokes is where the fun begins. Non-character strokes represent actions like pressing the left arrow key or selecting all the text on the input. Below is a comprehensive lists of the available non-character strokes.

* `ghostwriter.backspace`
* `ghostwriter.left`
* `ghostwriter.right`
* `ghostwriter.up`
* `ghostwriter.down`
* `ghostwriter.enter`
* `ghostwriter.tab`
* `ghostwriter.esc`
* `ghostwriter.selectAll`
* `ghostwriter.deleteAll`
* `ghostwriter.noop`

If you'd like to repeat a non-character stroke, rather then doing something like:

```javascript
var ghost = ghostwriter.haunt({
  input: '.haunt-me'
, maunscript: [
    'backspace'
  , ghostwriter.backspace
  , ghostwriter.backspace
  , ghostwriter.backspace
  , ghostwriter.backspace
  , ghostwriter.backspace
  , ghostwriter.backspace
  , ghostwriter.backspace
  , ghostwriter.backspace
  , ghostwriter.backspace
  ]
});
```

You can do something like this and save yourself some typing:

```javascript
var ghost = ghostwriter.haunt({
  input: '.haunt-me'
, maunscript: [
    'backspace'
  , ghostwriter.backspace(9)
  ]
});
```

Example
-------

```html
<html>
  <head>
    <script src="http://code.jquery.com/jquery-1.8.3.js"></script>
    <script src="https://raw.github.com/jharding/ghostwriter/master/ghostwriter.js"></script>
  </head>
  <body>
    <input class="haunt-me" type="text">

    <script>
      var ghost = ghostwriter.haunt({
        input: '.haunt-me'
      , manuscript: [
          'boo!'
        , ghostwriter.backspace(4)
        , 'sorry if i startled you'
        , ghostwriter.deleteAll
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

[ghostwriter.js]: https://raw.github.com/jharding/ghostwriter/master/ghostwriter.js
[ghostwriter.min.js]: https://raw.github.com/jharding/ghostwriter/master/ghostwriter.min.js
[options]: https://github.com/jharding/ghostwriter#options
