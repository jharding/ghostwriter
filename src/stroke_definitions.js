stroke.definitions = {
  character: function(o, char) {
    var newVal = o.val.beforeCursor + char + o.val.afterCursor;

    this
    .trigger(utils.getKeyEvent('keydown', char))
    .trigger(utils.getKeyEvent('keypress', char))
    .trigger(utils.getKeyEvent('textInput', char))
    .val(newVal)
    .trigger(utils.getKeyEvent('keyup', char))
    .trigger(utils.getKeyEvent('input', char));

    utils.setCursorPos(this, o.cursorPos + 1);
  }

, backspace: function(o) {
    var keyCode = 8
      , newVal = o.val.beforeCursor.slice(0, -1) + o.val.afterCursor
      , newCursorPos = o.cursorPos === 0 ? 0 : o.cursorPos - 1;

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .val(newVal)
    .trigger(utils.getKeyEvent('keyup', keyCode));

    if (this.val() !== o.val.all) {
      this.trigger(utils.getKeyEvent('input', keyCode));
    }

    utils.setCursorPos(this, newCursorPos);
  }

, right: function(o) {
    var keyCode = 39;

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    utils.setCursorPos(this, o.cursorPos + 1);
    this.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, left: function(o) {
    var keyCode = 37;

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    utils.setCursorPos(this, o.cursorPos - 1);
    this.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, up: function(o) {
    var keyCode = 38;

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .trigger(utils.getKeyEvent('keyup', keyCode));
  }

, down: function(o) {
    var keyCode = 40;

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .trigger(utils.getKeyEvent('keyup', keyCode));
  }

, enter: function(o) {
    var keyCode = 13;

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .trigger(utils.getKeyEvent('keyup', keyCode));
  }

, tab: function(o) {
    var keyCode = 9;

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .trigger(utils.getKeyEvent('keyup', keyCode));
  }

, esc: function(o) {
    var keyCode = 27;

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .trigger(utils.getKeyEvent('keyup', keyCode));
  }

, selectAll: function(o) {
    // TODO: need to trigger corresponding keyboard events
    this.select();
  }

, deleteSelection: function(o) {
    var keyCode = 8
      , newVal = o.val.all.slice(0, o.selection.start) +
        o.val.all.slice(o.selection.end);

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .val(newVal)
    .trigger(utils.getKeyEvent('keyup', keyCode));

    if (this.val() !== o.val.all) {
      this.trigger(utils.getKeyEvent('input', keyCode));
    }
  }

, trigger: function(o, eventType) {
    this.trigger(eventType);
  }

, noop: function() {}
};
