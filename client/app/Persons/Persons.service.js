'use strict';

angular.module('hierarchyApp')
  .factory('Persons', function (Person) {
    var rootPerson = new Person();
    rootPerson.isRoot = true;

    var unassigns = [];

    var Persons = {
      root: rootPerson,
      selected: null,
      create: function (age) {
        unassigns.push(new Person(age));
      },
      createNewbie:function(){
        this.create(Math.floor(Math.random()*4));
      },
      createCareer: function(){
        this.create(Math.floor(Math.random()*30)+5);
        this.skill *= .8;
      },
      nextYear : function(){
        unassigns.forEach(function(v,i,ua){
          if(Math.random() > .3){
            ua.splice(i,1);
          }
        });
        var newCount = Math.random() * 2;
        while(newCount-- > 0){
          this.createNewbie();
        }
        var careerCount = Math.random() * 3;
        while(careerCount-- > 0){
          this.createCareer();
        }

      },
      assignTo: function(person, parent) {
        //親か無所属リストから取り除く
        var from = person.parent ? person.parent.children : unassigns;
        from.some(function(p, idx, ary){
          if(p === person){
            ary.splice(idx,1);
            return true;
          }
          return false
        });
        if(person.parent == rootPerson){
//          Persons.root = rootPerson;
        }

        //新規配属先設定
        var dest = parent ? parent.children : unassigns;
        dest.push(person);

        if(parent == rootPerson){
//          Persons.root = person;
        }

        person.parent = parent;
      },
      get unassigns(){
        return unassigns;
      },
      get tiers(){
        return tiers;
      }
    };
    return Persons;
  });
