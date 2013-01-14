var Ghost = (function() {
  // constructor
  // -----------

  function Ghost(o) {
    this.loop = !!o.loop;
    this.intervalId = null;
    this.interval = o.interval || 300;

    this.$input = $(o.input);
    this.originalInputVal = this.$input.val();

    this.story = [];
    this.manuscript = parseManuscript(o.manuscript);
  }

  // public methods
  // --------------

  utils.mixin(Ghost.prototype, {
    start: function() {
      if (!this.intervalId) {
        this.$input.focus();
        this.story = this.story.length ? this.story : this.manuscript.slice(0);

        this.intervalId = setInterval(utils.bind(write, this), this.interval);
      }

      return this;
    }

  , pause: function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId =  null;
      }

      return this;
    }

  , stop: function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.story = [];
        this.intervalId =  null;
        this.$input.blur();
        this.$input.val(this.originalInputVal);
      }

      return this;
    }

  , restart: function() {
      this.stop();
      this.start();

      return this;
    }
  });

  // private methods
  // ---------------

  function parseManuscript(manuscript) {
    manuscript = utils.isString(manuscript) ? [manuscript] : manuscript;

    manuscript = utils.map(manuscript, function(section) {
      if (utils.isString(section)) {
        return utils.map(section.split(''), function(c) {
          return utils.bind(strokes.character, null, c);
        });
      }

      else if (utils.isRepeatified(section)) {
        return section(1);
      }

      return section;
    });

    return utils.merge(manuscript);
  }

  function write() {
    var next = this.story.shift()
      , cursorPos = utils.getCursorPos(this.$input) || 0
      , inputVal = this.$input.val()
      , beforeCursor = inputVal.substr(0, cursorPos)
      , afterCursor = inputVal.substr(cursorPos);

    switch (typeof next) {
      case 'function':
        next(
          this.$input
        , cursorPos
        , { all: inputVal, before: beforeCursor, after: afterCursor}
        );
        break;
      case 'undefined':
        this.loop ? this.restart() : this.pause();
        break;
      default:
        throw new Error('bad story');
    }
  }

  return Ghost;
})();
