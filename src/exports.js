// exports
// -------

utils.mixin(exports, utils.repeatify(strokes), {
  haunt: function(o) { return new Ghostwriter(o); }
});

// character stroke is special, don't expose it
delete exports.character;

