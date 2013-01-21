describe('Haunting', function() {
  var fixture = '<input class="ghostwriter">'
    , strokes = stroke.builder();

  beforeEach(function() {
    var $fixtures;

    setFixtures(fixture);
    $fixtures = $('#jasmine-fixtures');

    this.$input = $fixtures.find('.ghostwriter');

    this.haunting = new Haunting({
      input: this.$input
    , manuscript: [strokes.noop.repeat(3)]
    });
  });

  describe('#start', function() {
    it('should trigger ghostwriter:start if stopped', function() {
      var startSpy = spyOnEvent(this.$input, 'ghostwriter:start')
        , resumeSpy = spyOnEvent(this.$input, 'ghostwriter:resume');

      this.haunting.start();
      expect(startSpy).toHaveBeenTriggered();
      expect(resumeSpy).not.toHaveBeenTriggered();
    });

    it('should trigger ghostwriter:pause if paused', function() {
      var startSpy, resumeSpy;
      this.haunting.start().pause();

      startSpy = spyOnEvent(this.$input, 'ghostwriter:start');
      resumeSpy = spyOnEvent(this.$input, 'ghostwriter:resume');

      this.haunting.start();
      expect(resumeSpy).toHaveBeenTriggered();
      expect(startSpy).not.toHaveBeenTriggered();
    });

    it('should not trigger ghostwriter:start or ghostwriter:resume if started'
    , function() {
      var startSpy, resumeSpy;
      this.haunting.start();

      startSpy = spyOnEvent(this.$input, 'ghostwriter:start');
      resumeSpy = spyOnEvent(this.$input, 'ghostwriter:resume');

      this.haunting.start();
      expect(resumeSpy).not.toHaveBeenTriggered();
      expect(startSpy).not.toHaveBeenTriggered();
    });
  });

  describe('#pause', function() {
    it('should trigger ghostwriter:pause if started', function() {
      var pauseSpy = spyOnEvent(this.$input, 'ghostwriter:pause');

      this.haunting.start().pause();
      expect(pauseSpy).toHaveBeenTriggered();
    });

    it('should not trigger ghostwriter:pause if paused', function() {
      var pauseSpy;
      this.haunting.start().pause();

      pauseSpy = spyOnEvent(this.$input, 'ghostwriter:pause');

      this.haunting.pause();
      expect(pauseSpy).not.toHaveBeenTriggered();
    });

    it('should not trigger ghostwriter:pause if stopped', function() {
      var pauseSpy;
      this.haunting.start().stop();

      pauseSpy = spyOnEvent(this.$input, 'ghostwriter:pause');

      this.haunting.pause();
      expect(pauseSpy).not.toHaveBeenTriggered();
    });
  });

  describe('#stop', function() {
    it('should trigger ghostwriter:stop if started', function() {
      var stopSpy;
      this.haunting.start();

      stopSpy = spyOnEvent(this.$input, 'ghostwriter:stop');

      this.haunting.stop();
      expect(stopSpy).toHaveBeenTriggered();
    });

    it('should trigger ghostwriter:stop if paused', function() {
      var stopSpy;
      this.haunting.start().pause();

      stopSpy = spyOnEvent(this.$input, 'ghostwriter:stop');

      this.haunting.stop();
      expect(stopSpy).toHaveBeenTriggered();
    });

    it('should not trigger ghostwriter:stop if stopped', function() {
      var stopSpy;
      this.haunting.start().stop();

      stopSpy = spyOnEvent(this.$input, 'ghostwriter:stop');

      this.haunting.stop();
      expect(stopSpy).not.toHaveBeenTriggered();
    });

    it('should reset the value of the input', function() {
      spyOn(this.haunting, 'reset');
      this.haunting.start().stop();
      expect(this.haunting.reset).toHaveBeenCalled();
    });

    it('should blur input', function() {
      this.$input.focus();
      this.haunting.start().stop();
      expect(this.$input).not.toBeFocused();
    });
  });

  describe('#restart', function() {
    it('should be alias for stop().start()', function() {
      spyOn(this.haunting, 'stop');
      spyOn(this.haunting, 'start');

      this.haunting.restart();
      expect(this.haunting.stop).toHaveBeenCalled();
      expect(this.haunting.start).toHaveBeenCalled();
    });
  });

  describe('#reset', function() {
    it('should restore the original value of the input', function() {
      this.haunting = new Haunting({
        input: this.$input.val('original value')
      , manuscript: [strokes.noop.repeat(3)]
      });

      this.$input.val('not original value');
      this.haunting.reset();
      expect(this.$input).toHaveValue('original value');
    });
  });
});
