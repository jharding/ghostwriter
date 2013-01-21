describe('right stroke', function() {
  var fixture = '<input class="ghostwriter">'
    , eventTypes = ['keydown', 'keyup'];

  beforeEach(function() {
    var $fixtures;

    setFixtures(fixture);
    $fixtures = $('#jasmine-fixtures');

    this.stroke = stroke.definitions.right;
    this.$input = $fixtures.find('.ghostwriter');
  });

  describe('when text is selected', function() {
    beforeEach(function() {
      this.oMock = {
          cursorPos: 1
        , selection: { start: 1, end: 3 }
        , val: { all: 'right', beforeCursor: 'r', afterCursor: 'ight' }
        };

      this.$input.val(this.oMock.val.all);
      utils.setSelection(
        this.$input
      , this.oMock.selection.start
      , this.oMock.selection.end
      );
    });

    eventsSpecHelper(eventTypes);

    it('should move cursor to end of selection between keydown and keyup'
    , function() {
      var oMock = this.oMock
        , $input = this.$input;

      $input
      .on('keydown', function() {
        expect(utils.getCursorPos($input)).toBe(oMock.cursorPos);
      })
      .on('keyup', function() {
        expect(utils.getCursorPos($input)).toBe(oMock.selection.end);
      });

      this.stroke.call(this.$input, this.oMock);
    });
  });

  describe('when text is not selected', function() {
    beforeEach(function() {
      this.oMock = {
          cursorPos: 3
        , selection: { start: 3, end: 3 }
        , val: { all: 'right', beforeCursor: 'rig', afterCursor: 'ht' }
        };

      this.$input.val(this.oMock.val.all);
      utils.setCursorPos(this.$input, this.oMock.cursorPos);
    });

    eventsSpecHelper(eventTypes);

    it('should move cursor forward between keydown and keyup', function() {
      var oMock = this.oMock
        , $input = this.$input;

      $input
      .on('keydown', function() {
        expect(utils.getCursorPos($input)).toBe(oMock.cursorPos);
      })
      .on('keyup', function() {
        expect(utils.getCursorPos($input)).toBe(oMock.cursorPos + 1);
      });

      this.stroke.call(this.$input, this.oMock);
    });
  });
});
