'use strict';

angular.module('hierarchyApp')
  .controller('MainCtrl', function ($scope, Persons) {
    var i = 5;
    while(i-- > 0){
      Persons.createCareer();
    }



    return;
    function assignTo(dest){
      var i = Math.random()*3 + 2;
      while(i-- > 0){
        Persons.assignTo(ua[0], dest);
      }
    }
    var ua = Persons.unassigns;
    var p = ua[0];
    Persons.assignTo(p, Persons.root);
    assignTo(p);
    p.children.forEach(function(c){
      assignTo(c);
    })


  });
