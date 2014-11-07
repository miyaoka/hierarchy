'use strict';

describe('Filter: appTime', function () {

  // load the filter's module
  beforeEach(module('hierarchyApp'));

  // initialize a new instance of the filter before each test
  var appTime;
  beforeEach(inject(function ($filter) {
    appTime = $filter('appTime');
  }));

  it('should return the input prefixed with "appTime filter:"', function () {
    var text = 'angularjs';
    expect(appTime(text)).toBe('appTime filter: ' + text);
  });

});
