'use strict';

describe('Filter: skillRank', function () {

  // load the filter's module
  beforeEach(module('hierarchyApp'));

  // initialize a new instance of the filter before each test
  var skillRank;
  beforeEach(inject(function ($filter) {
    skillRank = $filter('skillRank');
  }));

  it('should return the input prefixed with "skillRank filter:"', function () {
    var text = 'angularjs';
    expect(skillRank(text)).toBe('skillRank filter: ' + text);
  });

});
