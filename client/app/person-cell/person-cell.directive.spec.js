'use strict';

describe('Directive: personCell', function () {

  // load the directive's module and view
  beforeEach(module('hierarchyApp'));
  beforeEach(module('app/person-cell/person-cell.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<person-cell></person-cell>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the personCell directive');
  }));
});