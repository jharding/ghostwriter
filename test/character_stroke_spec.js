describe('character stroke', function() {
  var fixture = '<input class="ghostwriter">';

  beforeEach(function() {
    var $fixtures;

    setFixtures(fixture);
    $fixtures = $('#jasmine-fixtures');

    this.stroke = stroke.definitions.character;
    this.$input = $fixtures.find('.ghostwriter');
  });

  describe('when text is selected', function() {
    var eventTypes = [
        'keydown'
      , 'keypress'
      , 'textInput'
      , 'keyup'
      , 'input'
      ];

    beforeEach(function() {
      this.oMock = {
        cursorPos: 1
      , selection: { start: 1, end: 3 }
      , val: { all: 'text', beforeCursor: 't', afterCursor: 'ext' }
      };

      this.$input.val(this.oMock.val.all);
      utils.setSelection(
        this.$input
      , this.oMock.selection.start
      , this.oMock.selection.end
      );
    });

    eventsSpecHelper(eventTypes, 'a');

    it('should replace selected text with char between textInput and keyup'
    , function() {
      var $input = this.$input
      .on('textInput', function() { expect($input).toHaveValue('text'); })
      .on('keyup', function() { expect($input).toHaveValue('tat'); });

      this.stroke.call(this.$input, this.oMock, 'a');
    });

    it('should set cursor to inserted char between textInput and keyup'
    , function() {
      var $input = this.$input
      .on('textInput', function() {
        expect(utils.getCursorPos($input)).toBe(1);
      })
      .on('keyup', function() {
        expect(utils.getCursorPos($input)).toBe(2);
      });

      this.stroke.call(this.$input, this.oMock, 'a');
    });
  });

  describe('when text is not selected', function() {
    var eventTypes = [
        'keydown'
      , 'keypress'
      , 'textInput'
      , 'keyup'
      , 'input'
      ];

    beforeEach(function() {
      this.oMock = {
        cursorPos: 0
      , selection: { start: 0, end: 0 }
      , val: { all: '', beforeCursor: '', afterCursor: '' }
      };

      this.$input.val(this.oMock.val.all);
      utils.setCursorPos(this.$input, this.oMock.cursorPos);
    });

    eventsSpecHelper(eventTypes, 'a');

    it('should insert char at cursor position between textInput and keyup'
    , function() {
      var $input = this.$input
      .on('textInput', function() { expect($input).toHaveValue(''); })
      .on('keyup', function() { expect($input).toHaveValue('a'); });

      this.stroke.call(this.$input, this.oMock, 'a');
    });

    it('should set cursor to inserted char between textInput and keyup'
    , function() {
      var $input = this.$input
      .on('textInput', function() {
        expect(utils.getCursorPos($input)).toBe(0);
      })
      .on('keyup', function() {
        expect(utils.getCursorPos($input)).toBe(1);
      });

      this.stroke.call(this.$input, this.oMock, 'a');
    });
  });
});
