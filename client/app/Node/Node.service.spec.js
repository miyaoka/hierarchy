'use strict';

describe('Service: Node', function () {

  // load the service's module
  beforeEach(module('hierarchyApp'));

  // instantiate service
  var Node;
  beforeEach(inject(function (_Node_) {
    Node = _Node_;
  }));

  it('should do something', function () {
    expect(!!Node).toBe(true);
  });

});
