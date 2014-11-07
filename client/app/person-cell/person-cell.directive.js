'use strict';

angular.module('hierarchyApp')
  .directive('personCell', function () {
    return {
      templateUrl: 'app/person-cell/person-cell.html',
      restrict: 'EA',
      scope: {
        'person': '='
      },
      controller: function($scope, Persons){
        $scope.select = function(data, event){
          Persons.select(data);
        };
        $scope.isSelected = function(){
          return (Persons.selected == $scope.person || Persons.selected2 == $scope.person);
        }
      },
      link: function (scope, element, attrs) {
      }
    };
  });