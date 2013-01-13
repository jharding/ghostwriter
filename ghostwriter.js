// ghostwriter
// ===========
// * GitHub: https://github.com/jharding/ghostwriter
// * Copyright (c) 2013 Jake Harding
// * Licensed under the MIT license.

(function() {

  var keyMap = {
      left: { fn: 'left', keyCode: 37 }
    , right: { fn: 'right', keyCode: 39 }
    , backspace: { fn: 'backspace', keyCode: 8 }
    }
  , specialKeyFns = {
      left: left
    , right: right
    , backspace: backspace
    };

  // exports
  // -------

  this.ghostwriter = mixin({
    haunt: function(o) { return new Ghostwriter(o); }
  }, keyMap);

  // constructor
  // -----------

  function Ghostwriter(o) {
    this.intervalId = null;
    this.interval = o.interval || 200;

    this.$input = mixin($(o.input), specialKeyFns);
    this.orignalInputValue = this.$input.val();

    this.story = [];
    this.manuscript = isString(o.manuscript) ? [o.manuscript] : o.manuscript;
    this.manuscript = merge(this.manuscript.map(function(section) {
      return isString(section) ? section.split('') : section;
    }));
  }

  // public methods
  // --------------

  mixin(Ghostwriter.prototype, {
    start: function() {
      if (!this.intervalId) {
        this.$input.focus();
        this.story = this.story.length ? this.story : this.manuscript.slice(0);

        this.intervalId = setInterval(write.bind(this), this.interval);
      }

      return this;
    }

  , stop: function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId =  null;
        this.$input.blur();
      }

      return this;
    }

  , restart: function() {
      this.stop();
      this.$input.val(this.originalInputValue);
      this.story = [];
      this.start();

      return this;
    }
  });

  // private methods
  // ---------------

  function write() {
    var nextChar = this.story.shift()
      , inputValue = this.$input.val()
      , cursorPos = getCursorPos(this.$input) || 0
      , newInputValue;

    switch (typeof nextChar) {
      case 'string':
        newInputValue = [
          inputValue.substr(0, cursorPos)
        , nextChar
        , inputValue.substr(cursorPos)
        ].join('');

        this.$input
        .trigger(getKeyEvent('keydown'), nextChar)
        .trigger(getKeyEvent('keypress'), nextChar)
        .trigger(getKeyEvent('textInput'), nextChar)
        .trigger(getKeyEvent('keyup'), nextChar)
        .val(newInputValue)
        .trigger(getKeyEvent('input'), nextChar);

        setCursorPos(this.$input, cursorPos + 1);

        break;
      case 'object':
        this.$input
        .trigger(getKeyEvent('keydown'), nextChar)
        [nextChar.fn]()
        .trigger(getKeyEvent('keyup'), nextChar);

        break;
      case 'undefined':
        this.stop();

        break;
      default:
        throw new Error('bad story');
    }
  }

  // key functions
  // -------------

  function backspace() {
    this.val(this.val().slice(0, -1));
    return this;
  }

  function right() {
    setCursorPos(this, getCursorPos(this) + 1);
    return this;
  }

  function left() {
    setCursorPos(this, getCursorPos(this) - 1);
    return this;
  }

  // helper functions
  // ----------------

  function getKeyEvent(type, key) {
    var event = $.Event(type);
    event.which = event.keyCode = isString(key) ? key.charCodeAt(0) : key;

    return event;
  }

  function getCursorPos($input) {
    var selectionStart = $input[0].selectionStart;

    if (selectionStart) {
     return selectionStart;
    }

    else if (document.selection) {
      $input.focus();

      var range = document.selection.createRange();
      range.moveStart('character', -valueLength);

      return range.text.length;
    }
  }

  function setCursorPos($input, pos) {
    var input = $input[0]
      , textRange;

    if (input.createTextRange) {
      textRange = input.createTextRange();
      textRange.collapse(true);
      textRange.moveEnd(pos);
      textRange.moveStart(pos);
      textRange.select();
    }

    else if (input.setSelectionRange) {
      input.setSelectionRange(pos, pos);
    }
  }

  function merge(array) {
    return [].concat.apply([], array);
  }

  function mixin(target) {
    var args = [].slice.call(arguments, 1), source;

    while (source = args.shift()) {
      for (var k in source) {
        source.hasOwnProperty(k) && (target[k] = source[k]);
      }
    }

    return target;
  }

  function isString(obj) {
    return typeof obj === 'string';
  }
})();
