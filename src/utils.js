var utils = {
  // common utilities
  // ----------------

  isString: function(obj) {
    return typeof obj === 'string';
  }

, isArray: function(obj) {
    Object.prototype.toString.call(obj) === '[object Array]';
  }

, merge: function(array) {
    return [].concat.apply([], array);
  }

, mixin: function(target) {
    var args = [].slice.call(arguments, 1), source;

    while (source = args.shift()) {
      for (var k in source) {
        source.hasOwnProperty(k) && (target[k] = source[k]);
      }
    }

    return target;
  }

  // stroke helpers
  // --------------

, getKeyEvent: function(type, key) {
    var event = $.Event(type);
    event.which = event.keyCode = utils.isString(key) ? key.charCodeAt(0) : key;

    return event;
  }

, getCursorPos: function($input) {
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

, setCursorPos: function($input, pos) {
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
};
