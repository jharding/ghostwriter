var utils = (function() {
  var concat = Array.prototype.concat;

  return {
    // common utilities
    // ----------------

    isString: function(obj) {
      return typeof obj === 'string';
    }

  , isNumber: function(obj) {
      return typeof obj === 'number';
    }

  , isFunction: $.isFunction

  , isArray: $.isArray

  , each: $.each

  , map: $.map

  , bind: $.proxy

  , merge: function(array) {
      return concat.apply([], array);
    }

  , mixin: $.extend

    // stroke helpers
    // --------------

  , getKeyEvent: function(type, key) {
      var event = $.Event(type);

      // distinguishes events triggered by ghostwriter
      event.ghostwriter = true;

      if (type === 'keypress') {
        event.which =
        event.keyCode =
        event.charCode = utils.isString(key) ? key.charCodeAt(0) : key;
      }

      else if (type === 'keydown' || type === 'keyup') {
        event.charCode = 0;
        event.which = event.charCode = utils.isString(key) ?
          key.toUpperCase().charCodeAt(0) : key;
      }

      else if (type === 'textInput') {
        if (!utils.isString(key)) {
          throw new TypeError('non-string passed for textInput');
        }

        event.data = key;
      }

      return event;
    }

  , getSelection: function($input) {
      var input = $input[0]
        , selectionStart = input.selectionStart
        , selectionEnd = input.selectionEnd
        , valueLength
        , docSelectionRange
        , selectionRange
        , endRange
        , start
        , end;

      if (utils.isNumber(selectionStart)) {
        start = selectionStart, end = selectionEnd;
      }

      // oh god, ie...
      // not caring about carriage returns since ghostwriter
      // does not currently support textareas
      // http://stackoverflow.com/a/7745998/393075
      else if (input.createTextRange && $input.is(':focus')) {
        start = end = 0;
        valueLength = input.value.length;
        docSelectionRange = document.selection.createRange();

        selectionRange = input.createTextRange();
        selectionRange.moveToBookmark(docSelectionRange.getBookmark());

        while (selectionRange.compareEndPoints('EndToStart', selectionRange)) {
          selectionRange.moveEnd('character', -1);
          end++;
        }

        selectionRange.setEndPoint('StartToStart', input.createTextRange());
        while (selectionRange.compareEndPoints('EndToStart', selectionRange)) {
          selectionRange.moveEnd('character', -1);
          start++;
          end++;
        }
      }

      return { start: start, end: end };
    }

  , setSelection: function($input, start, end) {
      var input = $input[0]
        , textRange;

      if (input.setSelectionRange) {
        input.setSelectionRange(start, end);
      }

      else if (input.createTextRange) {
        textRange = input.createTextRange();
        textRange.collapse(true);
        textRange.moveEnd('character', start);
        textRange.moveStart('character', end);
        textRange.select();
      }
    }

  , getCursorPos: function($input) {
      return utils.getSelection($input).start;
    }

  , setCursorPos: function($input, pos) {
      utils.setSelection($input, pos, pos);
    }
  };
})();
