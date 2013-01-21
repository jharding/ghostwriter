var Haunting = (function() {
  // constructor
  // -----------

  function Haunting(o) {
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

  utils.mixin(Haunting.prototype, {
    start: function() {
      var eventType;

      if (!this.intervalId) {
        eventType = this.story.length ? 'resume' : 'start';
        this.story = this.story.length ? this.story : this.manuscript.slice(0);

        this.$input.trigger('ghostwriter:' + eventType).focus();
        this.intervalId = setInterval(utils.bind(write, this), this.interval);
      }

      return this;
    }

  , pause: function() {
      if (this.intervalId) {
        this.$input.trigger('ghostwriter:pause');

        clearInterval(this.intervalId);
        this.intervalId =  null;
      }

      return this;
    }

  , stop: function() {
      if (this.intervalId || this.story.length) {
        this.$input.trigger('ghostwriter:stop');
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
      , cursorPos = utils.getCursorPos(this.$input)
      , o = {
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
      this.loop ? this.restart() : this.reset();
    }
  }

  return Haunting;
})();
