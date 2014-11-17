'use strict';

describe('Service: Workers', function () {

  // load the service's module
  beforeEach(module('hierarchyApp'));

  // instantiate service
  var Workers;
  beforeEach(inject(function (_Workers_) {
    Workers = _Workers_;
  }));

  it('should do something', function () {
    expect(!!Workers).toBe(true);
  });

});
