stroke.definitions = {
  character: function(o, char) {
    var selStart = o.selection.start
      , selEnd = o.selection.end
      , newVal
      , newCursorPos;

    // inserts char at cursor
    if (selStart === selEnd) {
      newVal = o.val.beforeCursor + char + o.val.afterCursor;
      newCursorPos = o.cursorPos + 1;
    }

    // replaces selected text with char
    else {
      newVal = o.val.all.slice(0, selStart) + char +  o.val.all.slice(selEnd);
      newCursorPos = selStart + 1;
    }

    this
    .trigger(utils.getKeyEvent('keydown', char))
    .trigger(utils.getKeyEvent('keypress', char))
    .trigger(utils.getKeyEvent('textInput', char))
    .val(newVal);

    utils.setCursorPos(this, newCursorPos);

    this
    .trigger(utils.getKeyEvent('keyup', char))
    .trigger(utils.getKeyEvent('input', char));
  }

, backspace: function(o) {
    var keyCode = 8
      , selStart = o.selection.start
      , selEnd = o.selection.end
      , newVal
      , newCursorPos;

    // remove character behind cursor
    if (selStart === selEnd) {
      newVal = o.val.beforeCursor.slice(0, -1) + o.val.afterCursor;
      newCursorPos = o.cursorPos === 0 ? 0 : o.cursorPos - 1;
    }

    // remove selected text
    else {
      newVal = o.val.all.slice(0, selStart) + o.val.all.slice(selEnd);
      newCursorPos = selStart;
    }

    this.trigger(utils.getKeyEvent('keydown', keyCode)).val(newVal);
    utils.setCursorPos(this, newCursorPos);
    this.trigger(utils.getKeyEvent('keyup', keyCode));

    if (this.val() !== o.val.all) {
      this.trigger(utils.getKeyEvent('input', keyCode));
    }
  }

, right: function(o) {
    var keyCode = 39
      , selStart = o.selection.start
      , selEnd = o.selection.end
      , newCursorPos = selStart === selEnd ? o.cursorPos + 1 : selEnd;

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    utils.setCursorPos(this, newCursorPos);
    this.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, left: function(o) {
    var keyCode = 37
      , selStart = o.selection.start
      , selEnd = o.selection.end
      , newCursorPos = selStart === selEnd ? o.cursorPos - 1 : selStart;

    this.trigger(utils.getKeyEvent('keydown', keyCode));
    utils.setCursorPos(this, newCursorPos);
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

, selectLeft: function(o) {
    // TODO: need to trigger corresponding keyboard events
    utils.setSelection(this, o.selection.start - 1, o.selection.end);
  }

, selectRight: function(o) {
    // TODO: need to trigger corresponding keyboard events
    utils.setSelection(this, o.selection.start, o.selection.end + 1);
  }

, selectAll: function(o) {
    // TODO: need to trigger corresponding keyboard events
    this.select();
  }

, trigger: function(o, eventType) {
    this.trigger(eventType);
  }

, noop: function() {}
};
