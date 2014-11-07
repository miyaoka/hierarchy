'use strict';

angular.module('hierarchyApp')
  .filter('skillRank', function () {
    return function (person) {
      if(!person){
        return null;
      }
      //0-10
      return (person.age < 5) ? 5 : Math.round(person.origSkill / person.age * 10);
    };
  });