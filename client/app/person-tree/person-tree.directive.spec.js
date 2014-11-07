'use strict';

describe('Directive: personTree', function () {

  // load the directive's module and view
  beforeEach(module('hierarchyApp'));
  beforeEach(module('app/person-tree/person-tree.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<person-tree></person-tree>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the personTree directive');
  }));
});