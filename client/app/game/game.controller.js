'use strict';

angular.module('hierarchyApp')
  .controller('GameCtrl', function ($scope, Persons, Time, Assets) {

    $scope.persons = Persons;
    $scope.unassignedPersons = Persons.unassigns;
    $scope.time = Time;
    $scope.assets = Assets;

    function assignTo(dest){
      var i = Math.random()*3 + 2;
      while(i-- > 0){
        Persons.assignTo(ua[0], dest);
      }
    }

    $scope.nextYear = function(){
      Time.nextYear();
    };
    $scope.onDrop = function(data, event){
      Persons.assignTo(data, null);
    };


    return;
    var ua = Persons.unassigns;
    var p = ua[0];
    Persons.assignTo(p, Persons.root);
    assignTo(p);
    p.children.forEach(function(c){
      assignTo(c);
    })


  });