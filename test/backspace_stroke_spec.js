describe('backspace stroke', function() {
  var fixture = '<input class="ghostwriter">';

  beforeEach(function() {
    var $fixtures;

    setFixtures(fixture);
    $fixtures = $('#jasmine-fixtures');

    this.stroke = stroke.definitions.backspace;
    this.$input = $fixtures.find('.ghostwriter');
  });

  describe('when cursor is at position 0', function() {
    var eventTypes = ['keydown', 'keyup'];

    beforeEach(function() {
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

  describe('when cursor is at position > 0', function() {
    var eventTypes = ['keydown', 'keyup', 'input'];

    beforeEach(function() {
      this.oMock = {
        cursorPos: 1
      , selection: { start: 1, end: 1 }
      , val: { all: 'a', beforeCursor: 'a', afterCursor: '' }
      };

      this.$input.val(this.oMock.val.all);
      utils.setCursorPos(this.$input, this.oMock.cursorPos);
    });

    eventsSpecHelper(eventTypes);

    it('should remove char before cursor between keydown and keyup'
    , function() {
      var $input = this.$input
      .on('keydown', function() { expect($input).toHaveValue('a'); })
      .on('keyup', function() { expect($input).toHaveValue(''); });

      this.stroke.call(this.$input, this.oMock);
    });

    it('should move cursor backward between keydown and keyup'
    , function() {
      var oMock = this.oMock
        , $input = this.$input;

      $input
      .on('textInput', function() {
        expect(utils.getCursorPos($input)).toBe(oMock.cursorPos);
      })
      .on('keyup', function() {
        expect(utils.getCursorPos($input)).toBe(oMock.cursorPos - 1);
      });

      this.stroke.call(this.$input, this.oMock);
    });
  });

  describe('when text is selected', function() {
    var eventTypes = ['keydown', 'keyup', 'input'];

    beforeEach(function() {
      this.oMock = {
        cursorPos: 2
      , selection: { start: 2, end: 4 }
      , val: { all: 'text', beforeCursor: 'te', afterCursor: 'tt' }
      };

      this.$input.val(this.oMock.val.all);
      utils.setSelection(
        this.$input
      , this.oMock.selection.start
      , this.oMock.selection.end
      );
    });

    eventsSpecHelper(eventTypes);

    it('should remove selected text between keydown and keyup', function() {
      var oMock = this.oMock
        , $input = this.$input;

      $input
      .on('keydown', function() { expect($input).toHaveValue(oMock.val.all); })
      .on('keyup', function() { expect($input).toHaveValue('te'); });

      this.stroke.call(this.$input, this.oMock);
    });

    it('should move cursor to start of selection between keydown and keyup'
    , function() {
      var oMock = this.oMock
        , $input = this.$input;

      $input
      .on('textInput', function() {
        expect(utils.getCursorPos($input)).toBe(oMock.cursorPos);
      })
      .on('keyup', function() {
        expect(utils.getCursorPos($input)).toBe(oMock.selection.start);
      });

      this.stroke.call(this.$input, this.oMock);
    });
  });
});
