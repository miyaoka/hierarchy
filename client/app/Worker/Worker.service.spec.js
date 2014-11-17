'use strict';

describe('Service: Worker', function () {

  // load the service's module
  beforeEach(module('hierarchyApp'));

  // instantiate service
  var Worker;
  beforeEach(inject(function (_Worker_) {
    Worker = _Worker_;
  }));

  it('should do something', function () {
    expect(!!Worker).toBe(true);
  });

});
