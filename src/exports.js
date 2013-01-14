// exports
// -------

utils.mixin(exports, strokes, {
  haunt: function(o) { return new Ghostwriter(o); }
});

// character stroke is special, don't expose it
delete exports.character;

