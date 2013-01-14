var strokes = {

  character: function(newChar, $input, cursorPos, val) {
    $input
    .trigger(utils.getKeyEvent('keydown'), newChar)
    .trigger(utils.getKeyEvent('keypress'), newChar)
    .trigger(utils.getKeyEvent('textInput'), newChar)
    .trigger(utils.getKeyEvent('keyup'), newChar)
    .val(val.before + newChar + val.after)
    .trigger(utils.getKeyEvent('input'), newChar);

    utils.setCursorPos($input, cursorPos + 1);
  }

, backspace: function($input, cursorPos, val) {
    var keyCode = 8
      , newCursorPos = cursorPos === 0 ? 0 : cursorPos - 1;

    $input
    .trigger(utils.getKeyEvent('keydown'), keyCode)
    .val(val.before.substr(0, newCursorPos) + val.after)
    .trigger(utils.getKeyEvent('keyup'), keyCode);

    if ($input.val() !== val.all) {
      $input.trigger(utils.getKeyEvent('input'), keyCode);
    }

    utils.setCursorPos($input, cursorPos);
  }

, right: function($input, cursorPos) {
    var keyCode = 39;

    $input.trigger(utils.getKeyEvent('keydown'), keyCode);
    utils.setCursorPos($input, cursorPos + 1);
    $input.trigger(utils.getKeyEvent('keyup'), keyCode);
  }

, left: function($input, cursorPos) {
    var keyCode = 37;

    $input.trigger(utils.getKeyEvent('keydown'), keyCode);
    utils.setCursorPos($input, cursorPos - 1);
    $input.trigger(utils.getKeyEvent('keyup'), keyCode);
  }
};
