function eventsSpecHelper(eventTypes) {
  var strokeArgs = [].slice.call(arguments, 1);

  it('should trigger ' + eventTypes.join(', ') + ' in order', function() {
    var $input = this.$input
      , eventSpies = {}
      , triggerOrder = [];

    // attach a spy handler for each event
    eventTypes.forEach(function(eventType) {
      var spy = jasmine.createSpy().andCallFake(function() {
        triggerOrder.push(eventType);
      });

      $input.on(eventType, eventSpies[eventType] = spy);
    });

    this.stroke.apply(this.$input, [this.oMock].concat(strokeArgs));

    eventTypes.forEach(function(eventType, i) {
      expect(eventSpies[eventType]).toHaveBeenCalled();
      expect(triggerOrder[i]).toBe(eventType);
    });
  });
}
