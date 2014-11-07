'use strict';

angular.module('hierarchyApp')
  .directive('personTree', function (RecursionHelper) {
    return {
      templateUrl: 'app/person-tree/person-tree.html',
      restrict: 'EA',
      scope: {
        'treeroot': '=',
      },
      controller: function($scope, Persons){
        $scope.onDrop = function(data, event){
          Persons.assignTo(data, $scope.treeroot)
        };
      },
      compile: function(element){
        return RecursionHelper.compile(element, function(scope, element, attrs) {
        });
      }
    };
  });