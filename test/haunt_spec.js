describe('Haunt', function() {
  var fixture = '<input class="ghostwriter">'
    , strokes = stroke.builder();

  beforeEach(function() {
    var $fixtures;

    setFixtures(fixture);
    $fixtures = $('#jasmine-fixtures');

    this.$input = $fixtures.find('.ghostwriter');

    this.haunt = new Haunt({
      input: this.$input
    , manuscript: [strokes.noop.repeat(3)]
    });
  });

  describe('#start', function() {
    it('should trigger ghostwriter:start if stopped', function() {
      var startSpy = spyOnEvent(this.$input, 'ghostwriter:start')
        , resumeSpy = spyOnEvent(this.$input, 'ghostwriter:resume');

      this.haunt.start();
      expect(startSpy).toHaveBeenTriggered();
      expect(resumeSpy).not.toHaveBeenTriggered();
    });

    it('should trigger ghostwriter:pause if paused', function() {
      var startSpy, resumeSpy;
      this.haunt.start().pause();

      startSpy = spyOnEvent(this.$input, 'ghostwriter:start');
      resumeSpy = spyOnEvent(this.$input, 'ghostwriter:resume');

      this.haunt.start();
      expect(resumeSpy).toHaveBeenTriggered();
      expect(startSpy).not.toHaveBeenTriggered();
    });

    it('should not trigger ghostwriter:start or ghostwriter:resume if started'
    , function() {
      var startSpy, resumeSpy;
      this.haunt.start();

      startSpy = spyOnEvent(this.$input, 'ghostwriter:start');
      resumeSpy = spyOnEvent(this.$input, 'ghostwriter:resume');

      this.haunt.start();
      expect(resumeSpy).not.toHaveBeenTriggered();
      expect(startSpy).not.toHaveBeenTriggered();
    });

    describe('stroke execution', function() {
      beforeEach(function() {
        this.strokeSpy = jasmine.createSpy();

        this.haunt = new Haunt({
          input: this.$input.val('original value')
        , interval: 50
        , manuscript: [stroke.factory(this.strokeSpy).repeat(3)]
        });

      });

      it('should execute each stroke once', function() {
        this.haunt.start();
        waits(300);
        runs(function() { expect(this.strokeSpy.callCount).toBe(3); });
      });

      it('should trigger ghostwriter:finish when the haunt finishes'
      , function() {
        var finishSpy = spyOnEvent(this.$input, 'ghostwriter:finish');

        this.haunt.start();
        waits(300);
        runs(function() { expect(finishSpy).toHaveBeenTriggered(); });
      });

      it('should not trigger ghostwriter:stop when the haunt finishes'
      , function() {
        var stopSpy = spyOnEvent(this.$input, 'ghostwriter:stop');

        this.haunt.start();
        waits(300);
        runs(function() { expect(stopSpy).not.toHaveBeenTriggered(); });
      });
    });
  });

  describe('#pause', function() {
    it('should trigger ghostwriter:pause if started', function() {
      var pauseSpy = spyOnEvent(this.$input, 'ghostwriter:pause');

      this.haunt.start().pause();
      expect(pauseSpy).toHaveBeenTriggered();
    });

    it('should not trigger ghostwriter:pause if paused', function() {
      var pauseSpy;
      this.haunt.start().pause();

      pauseSpy = spyOnEvent(this.$input, 'ghostwriter:pause');

      this.haunt.pause();
      expect(pauseSpy).not.toHaveBeenTriggered();
    });

    it('should not trigger ghostwriter:pause if stopped', function() {
      var pauseSpy;
      this.haunt.start().stop();

      pauseSpy = spyOnEvent(this.$input, 'ghostwriter:pause');

      this.haunt.pause();
      expect(pauseSpy).not.toHaveBeenTriggered();
    });
  });

  describe('#stop', function() {
    it('should trigger ghostwriter:stop if started', function() {
      var stopSpy;
      this.haunt.start();

      stopSpy = spyOnEvent(this.$input, 'ghostwriter:stop');

      this.haunt.stop();
      expect(stopSpy).toHaveBeenTriggered();
    });

    it('should trigger ghostwriter:stop if paused', function() {
      var stopSpy;
      this.haunt.start().pause();

      stopSpy = spyOnEvent(this.$input, 'ghostwriter:stop');

      this.haunt.stop();
      expect(stopSpy).toHaveBeenTriggered();
    });

    it('should not trigger ghostwriter:stop if stopped', function() {
      var stopSpy;
      this.haunt.start().stop();

      stopSpy = spyOnEvent(this.$input, 'ghostwriter:stop');

      this.haunt.stop();
      expect(stopSpy).not.toHaveBeenTriggered();
    });

    it('should reset the value of the input', function() {
      spyOn(this.haunt, 'reset');
      this.haunt.start().stop();
      expect(this.haunt.reset).toHaveBeenCalled();
    });

    it('should blur input', function() {
      this.$input.focus();
      this.haunt.start().stop();
      expect(this.$input).not.toBeFocused();
    });
  });

  describe('#restart', function() {
    it('should be alias for stop().start()', function() {
      spyOn(this.haunt, 'stop');
      spyOn(this.haunt, 'start');

      this.haunt.restart();
      expect(this.haunt.stop).toHaveBeenCalled();
      expect(this.haunt.start).toHaveBeenCalled();
    });
  });

  describe('#reset', function() {
    it('should restore the original value of the input', function() {
      this.haunt = new Haunt({
        input: this.$input.val('original value')
      , manuscript: [strokes.noop.repeat(3)]
      });

      this.$input.val('not original value');
      this.haunt.reset();
      expect(this.$input).toHaveValue('original value');
    });
  });
});
