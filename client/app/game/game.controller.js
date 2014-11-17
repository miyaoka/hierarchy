'use strict';

angular.module('hierarchyApp')
  .controller('GameCtrl', function ($scope, Persons, Time, Assets, Workers, Nodes, Data) {

    $scope.persons = Persons;
    $scope.unassignedPersons = Persons.unassigns;
    $scope.time = Time;
    $scope.assets = Assets;

    $scope.workers = Workers;
    $scope.nodes = Nodes;


    $scope.nextYear = function(){
      Time.nextYear();
    };
    $scope.save = function(){
      Data.save();
    };
    $scope.load = function(){
      Data.load();
    };
    $scope.clear = function(){
      Data.clear();
    };
    $scope.onDrop = function(data, event){
      Persons.assignTo(data, null);
    };



  });