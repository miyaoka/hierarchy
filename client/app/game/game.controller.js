'use strict';

angular.module('hierarchyApp')
  .controller('GameCtrl', function ($scope, Persons, Time, Assets) {

    $scope.persons = Persons;
    $scope.unassignedPersons = Persons.unassigns;
    $scope.time = Time;
    $scope.assets = Assets;



    $scope.nextYear = function(){
      Time.nextYear();
    };
    $scope.onDrop = function(data, event){
      Persons.assignTo(data, null);
    };



  });