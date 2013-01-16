var utils = (function() {
  var nativeForEach = Array.prototype.forEach
    , nativeMap = Array.prototype.map
    , nativeBind = Function.prototype.bind
    , slice = Array.prototype.slice
    , breaker = {}
    , Ctor = function() {};

  return {
    // common utilities
    // ----------------

    isString: function(obj) {
      return typeof obj === 'string';
    }

  , isFunction: function(obj) {
      return typeof obj === 'function';
    }

  , isArray: function(obj) {
      Object.prototype.toString.call(obj) === '[object Array]';
    }

    // stolen from underscore
  , each: function(obj, iterator, context) {
      if (!obj)  { return; }

      // native
      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      }

      // non-native array
      else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (iterator.call(context, obj[i], i, obj) === breaker) {
            return;
          }
        }
      }

      // non-native object
      else {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (iterator.call(context, obj[key], key, obj) === breaker) {
              return;
            }
          }
        }
      }
    }

    // stolen from underscore
  , map: function(obj, iterator, context) {
      var results = [];

      if (!obj) { return results; }

      // native
      if (nativeMap && obj.map === nativeMap) {
        return obj.map(iterator, context);
      }

      // non-native
      utils.each(obj, function(value, index, list) {
        results[results.length] = iterator.call(context, value, index, list);
      });

      return results;
    }

    // stolen from underscore
  , bind: function(func, context) {
      var that, args, bound, result;

      if (func.bind === nativeBind && nativeBind) {
        return nativeBind.apply(func, slice.call(arguments, 1));
      }

      if (!_.isFunction(func)) {
        throw new TypeError();
      }

      args = slice.call(arguments, 2);

      return bound = function() {
        if (!this instanceof bound) {
          return func.apply(context, args.concat(slice.call(arguments)));
        }

        ctor.prototype = func.prototype;
        that = new Ctor();
        ctor.prototype = null;

        result = func.apply(self, args.concat(slice.call(arguments)));

        return Object(result) === result ? result : that;
      };
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

      event.which = event.keyCode = utils.isString(key) ?
        key.charCodeAt(0) : key;

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
})();
