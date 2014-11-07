'use strict';

angular.module('hierarchyApp')
  .controller('MainCtrl', function ($scope, Persons) {
    var i = 5;
    while(i-- > 0){
      Persons.createCareer();
    }



    return;
    var ua = Persons.unassigns;
    var p = ua[0];
    Persons.assignTo(p, Persons.root);
    assignTo(p);
    p.children.forEach(function(c){
      assignTo(c);
    })


  });
