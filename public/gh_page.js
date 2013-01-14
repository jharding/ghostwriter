$(document).ready(function() {

  var ghost = ghostwriter.haunt({
    input: '.haunted'
  , interval: 100
  , manuscript: [
      'ghostwriter.js...'
    , ghostwriter.noop(10)
    , ghostwriter.selectAll
    , ghostwriter.deleteAll
    , 'it\'s a library'
    , ghostwriter.left(8)
    , ghostwriter.backspace
    , 'the'
    , ghostwriter.right(8)
    , ' for haunting your web page'
    , ghostwriter.noop(10)
    , ghostwriter.selectAll
    , ghostwriter.deleteAll
    , ghostwriter.noop(10)
    , 'BOO!'
    ]
  });

  debugger
  ghost.start();
});
