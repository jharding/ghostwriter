stroke.definitions = {
  character: function(o, char) {
    this
    .trigger(utils.getKeyEvent('keydown', char))
    .trigger(utils.getKeyEvent('keypress', char))
    .trigger(utils.getKeyEvent('textInput', char))
    .trigger(utils.getKeyEvent('keyup', char))
    .val(o.val.beforeCursor + char + o.val.afterCursor)
    .trigger(utils.getKeyEvent('input', char));

    utils.setCursorPos(this, o.cursorPos + 1);
  }

, backspace: function(o) {
    var keyCode = 8
      , newCursorPos = o.cursorPos === 0 ? 0 : o.cursorPos - 1;

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .val(o.val.beforeCursor.slice(0, -1) + o.val.afterCursor)
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

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    this.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, down: function(o) {
    var keyCode = 40;

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    this.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, enter: function(o) {
    var keyCode = 13;

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    this.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, tab: function(o) {
    var keyCode = 9;

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    this.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, esc: function(o) {
    var keyCode = 27;

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    this.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, selectAll: function(o) {
    this.select();
  }

, deleteAll: function(o) {
    var keyCode = 8;

    this
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .val('')
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
