'use strict';

angular.module('hierarchyApp')
  .controller('MainCtrl', function ($scope, Persons, Data) {
    Data.init();
    return;
    var i = 5;
    while(i-- > 0){
      Persons.createMidCareers();
    Workers.createNewGrads();
    Workers.createMidCareers();
    }

    var json = angular.toJson({
      workers: Workers.export()
    }, true);

//    console.log(json);
    console.log('imported', Workers.export());

    var workers = Workers.index;
    workers.forEach(function(w){
      w.advanceAge();
    });

    Workers.destroy(workers[3].id);
    console.log('edited', Workers.index);


    Workers.import(angular.fromJson(json).workers);

    console.log('imported', Workers.index);


    function init(){
      Roots.init();

    }

    return;
    function assignTo(dest){
      var i = Math.random()*3 + 2;
      while(i-- > 0){
        Persons.assignTo(ua[0], dest);
      }
    }
    var ua = Persons.midCareersRoot.children;
    var p = ua[0];
    Persons.assignTo(p, Persons.root);
    assignTo(p);
    p.children.forEach(function(c){
      assignTo(c);
    })


  });
