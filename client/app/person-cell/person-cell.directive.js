'use strict';

angular.module('hierarchyApp')
  .directive('personCell', function () {
    return {
      templateUrl: 'app/person-cell/person-cell.html',
      restrict: 'EA',
      scope: {
        'person': '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });