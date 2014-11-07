'use strict';

describe('Service: Persons', function () {

  // load the service's module
  beforeEach(module('hierarchyApp'));

  // instantiate service
  var Persons;
  beforeEach(inject(function (_Persons_) {
    Persons = _Persons_;
  }));

  it('should do something', function () {
    expect(!!Persons).toBe(true);
  });

});
