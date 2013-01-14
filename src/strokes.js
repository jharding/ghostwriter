var strokes = {

  character: function(newChar, $input, cursorPos, val) {
    $input
    .trigger(utils.getKeyEvent('keydown', newChar))
    .trigger(utils.getKeyEvent('keypress', newChar))
    .trigger(utils.getKeyEvent('textInput', newChar))
    .trigger(utils.getKeyEvent('keyup', newChar))
    .val(val.before + newChar + val.after)
    .trigger(utils.getKeyEvent('input', newChar));

    utils.setCursorPos($input, cursorPos + 1);
  }

, backspace: function($input, cursorPos, val) {
    var keyCode = 8
      , newCursorPos = cursorPos === 0 ? 0 : cursorPos - 1;

    $input
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .val(val.before.slice(0, -1) + val.after)
    .trigger(utils.getKeyEvent('keyup', keyCode));

    if ($input.val() !== val.all) {
      $input.trigger(utils.getKeyEvent('input', keyCode));
    }

    utils.setCursorPos($input, newCursorPos);
  }

, right: function($input, cursorPos) {
    var keyCode = 39;

    $input.trigger(utils.getKeyEvent('keydown', keyCode));
    utils.setCursorPos($input, cursorPos + 1);
    $input.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, left: function($input, cursorPos) {
    var keyCode = 37;

    $input.trigger(utils.getKeyEvent('keydown', keyCode));
    utils.setCursorPos($input, cursorPos - 1);
    $input.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, up: function($input) {
    var keyCode = 38;

    $input.trigger(utils.getKeyEvent('keydown', keyCode));
    $input.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, down: function($input) {
    var keyCode = 40;

    $input.trigger(utils.getKeyEvent('keydown', keyCode));
    $input.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, enter: function($input) {
    var keyCode = 13;

    $input.trigger(utils.getKeyEvent('keydown', keyCode));
    $input.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, tab: function($input) {
    var keyCode = 9;

    $input.trigger(utils.getKeyEvent('keydown', keyCode));
    $input.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, esc: function($input) {
    var keyCode = 27;

    $input.trigger(utils.getKeyEvent('keydown', keyCode));
    $input.trigger(utils.getKeyEvent('keyup', keyCode));
  }

, selectAll: function($input) {
    $input.select();
  }

, deleteAll: function($input, cursorPos, val) {
    var keyCode = 8;

    $input
    .trigger(utils.getKeyEvent('keydown', keyCode))
    .val('')
    .trigger(utils.getKeyEvent('keyup', keyCode));

    if ($input.val() !== val.all) {
      $input.trigger(utils.getKeyEvent('input', keyCode));
    }
  }

, noop: function() {}
};
