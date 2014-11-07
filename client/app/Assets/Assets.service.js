'use strict';

angular.module('hierarchyApp')
  .factory('Assets', function (Persons) {
    var total = 0;
    var term = 0;
    var lastTerm = 0;
    function sumProfit(person){
      var profit = person.childSum;
      person.children.forEach(function(p){
        profit += sumProfit(p);
      });
      return profit;
    }


    var Assets = {
      get total(){
        return total;
      },
      get term(){
        term = sumProfit(Persons.root);
        return term;
      },
      get lastTerm(){
        return lastTerm;
      },
      update: function(){
        total += term;
        lastTerm = term;
      }
    };
    return Assets;
  });
