'use strict';

describe('Service: Roots', function () {

  // load the service's module
  beforeEach(module('hierarchyApp'));

  // instantiate service
  var Roots;
  beforeEach(inject(function (_Roots_) {
    Roots = _Roots_;
  }));

  it('should do something', function () {
    expect(!!Roots).toBe(true);
  });

});
