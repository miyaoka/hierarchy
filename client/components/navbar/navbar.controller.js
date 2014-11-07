'use strict';

angular.module('hierarchyApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Readme',
      'link': '/readme'
    },{
      'title': 'ChangeLog',
      'link': '/changelog'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });