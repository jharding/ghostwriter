describe('up stroke', function() {
  var fixture = '<input class="ghostwriter">'
    , eventTypes = ['keydown', 'keyup'];

  beforeEach(function() {
    var $fixtures;

    setFixtures(fixture);
    $fixtures = $('#jasmine-fixtures');

    this.stroke = stroke.definitions.up;
    this.$input = $fixtures.find('.ghostwriter');

    this.oMock = {
      cursorPos: 0
    , selection: { start: 0, end: 0 }
    , val: { all: '', beforeCursor: '', afterCursor: '' }
    };

    this.$input.val(this.oMock.val.all);
    utils.setCursorPos(this.$input, this.oMock.cursorPos);
  });

  eventsSpecHelper(eventTypes);
});
