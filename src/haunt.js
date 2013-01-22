var Haunt = (function() {
  // constructor
  // -----------

  function Haunt(o) {
    this.loop = !!o.loop;
    this.intervalId = null;
    this.interval = o.interval || 300;

    this.$input = $(o.input).first();
    this.originalInputVal = this.$input.val();

    this.story = [];
    this.manuscript = parseManuscript(o.manuscript);
  }

  // public methods
  // --------------

  utils.mixin(Haunt.prototype, {
    start: function(silent) {
      var eventType;

      if (!this.intervalId) {
        eventType = this.story.length ? 'resume' : 'start';
        this.story = this.story.length ? this.story : this.manuscript.slice(0);

        !silent && this.$input.trigger('ghostwriter:' + eventType).focus();
        this.intervalId = setInterval(utils.bind(write, this), this.interval);
      }

      return this;
    }

  , pause: function(silent) {
      if (this.intervalId) {
        !silent && this.$input.trigger('ghostwriter:pause');

        clearInterval(this.intervalId);
        this.intervalId =  null;
      }

      return this;
    }

  , stop: function(silent) {
      if (this.intervalId || this.story.length) {
        !silent && this.$input.trigger('ghostwriter:stop');
      }

      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId =  null;
      }

      this.story = [];
      this.reset();
      this.$input.blur();

      return this;
    }

  , restart: function() {
      this.stop();
      this.start();

      return this;
    }

  , reset: function() {
      this.$input.val(this.originalInputVal);
    }
  });

  // private methods
  // ---------------

  function parseManuscript(manuscript) {
    manuscript = utils.isString(manuscript) ? [manuscript] : manuscript;

    manuscript = utils.map(manuscript, function(section) {
      if (utils.isString(section)) {
        return utils.map(section.split(''), function(char) {
          return exports.character(char);
        });
      }

      return section;
    });

    return utils.merge(manuscript);
  }

  function write() {
    var next = this.story.shift()
      , inputVal = this.$input.val()
      , cursorPos
      , o;

    // make sure input has focus otherwise selection and cursorPos
    // will get messed up in old ie
    this.$input.focus();

    cursorPos = utils.getCursorPos(this.$input)
    o = {
      cursorPos: cursorPos
    , selection: utils.getSelection(this.$input)
    , val: {
        all: inputVal
      , beforeCursor: inputVal.substr(0, cursorPos)
      , afterCursor: inputVal.substr(cursorPos)
      }
    };

    if (typeof next !== 'undefined') {
      (utils.isFunction(next) ? next() : next).exec(this.$input, o);
    }

    // all done!
    else {
      this.$input.trigger('ghostwriter:finish');
      this.loop ? this.restart() : this.stop(true);
    }
  }

  return Haunt;
})();
