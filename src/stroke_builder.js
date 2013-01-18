var stroke = (function() {
  function strokeBuilder() {
    var strokes = {};

    utils.each(stroke.definitions, function(key, definition) {
      strokes[key] = strokeFactory(definition);
    });

    return strokes;
  }

  function strokeFactory(definition, name) {
    var Stroke = function(args) {
      if (!(this instanceof Stroke)) {
        return new Stroke([].slice.call(arguments, 0));
      }

      this.args = args, this.name = name;
    };

    Stroke.repeat = function(times) {
      var strokes = [], stroke = new Stroke();
      while (times--) { strokes.push(stroke); }

      return strokes;
    };


    utils.mixin(Stroke.prototype, {
      repeat: function(times) {
        var strokes = [];
        while (times--) { strokes.push(this); }

        return strokes;
      }

    , exec: function($input, o) {
        definition.apply($input, [o].concat(this.args));
      }
    });

    return Stroke;
  }

  return { builder: strokeBuilder };
})();
