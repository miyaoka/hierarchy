'use strict';

angular.module('hierarchyApp')
  .factory('Time', function (Persons, Assets) {
    var date = new Date(2001,0,1);

    function personUpdate(person){
      if(!person.isRoot){
        person.advanceAge();
      }
      person.children.forEach(function(p){
        personUpdate(p);
      });
    }

    var Time = {
      get date(){
        return new Date(date.getTime());
      },
      nextYear : function(){
        date.setFullYear(date.getFullYear()+1);

        personUpdate(Persons.root);
        personUpdate(Persons.midCareersRoot);


        Assets.update();

        Persons.nextYear();
        Persons.cancelSelect();

      }
    };
    return Time;
  });

