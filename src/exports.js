// exports
// -------

utils.mixin(exports, stroke.builder(), {
  haunt: function(o) { return new Ghost(o); }
});
