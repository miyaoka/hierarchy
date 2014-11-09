'use strict';

angular.module('hierarchyApp')
  .factory('Persons', function (Person) {
    var rootPerson = new Person();
    rootPerson.isRoot = true;

    var unassigns = [];
    var selected = null;
    var selected2 = null;
    var action = null;
    var confirm = null;
    var alerts = [];
    var transferCount = 1;
    var transferCountLeft = 1;
    var employCount = 1;
    var employCountLeft = 1;

    function removeAssign(person){
      //親か無所属リストから取り除く
      var from = person.parent ? person.parent.children : unassigns;
      from.some(function(p, idx, ary){
        if(p === person){
          ary.splice(idx,1);
          return true;
        }
        return false
      });
      person.parent = null;
    }
    var Persons = {
      root: rootPerson,
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

        removeAssign(person);

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
      select: function(person){
        var isSelf = (selected == person);

        if(!action || action == 'fire'){
          Persons.cancelSelect();
          selected = (isSelf ? null : person);
          return;
        }

        if(isSelf){
          Persons.cancelSelect();
          return;
        }

        selected2 = person;
        alerts = [];
        if(action == 'transfer' || action == 'employ' || action == 'promote'){
          if(selected2.tier == 0){
            alerts.push('組織内の人物しか選べません');
          } else if(selected2 == selected.parent){
            alerts.push('同じ上司です');
          } else{
            if(selected2.skill <= selected.skill){
              alerts.push('上司のスキルが足りません');
            }
            if(action == 'transfer'){
              if(selected2.tier != (selected.tier - 1)){
                alerts.push('転属先が異なる地位です');
              }
            }
            if(action == 'promote'){
              if(selected2.tier > (selected.tier - 2)){
                alerts.push('上司の地位が足りません');
              }
            }
          }
        }

        confirm = (alerts.length > 0) ? false : true;
      },
      promote: function(){
        action = 'promote';
      },
      transfer: function(){
        action = 'transfer';
      },
      get hasTop(){
        return rootPerson.hasChildren;
      },
      employ: function(){
        if(Persons.hasTop){
          action = 'employ';
          return;
        }
        Persons.assignTo(selected, rootPerson);
        Persons.cancelSelect();
      },
      fire: function(){
        if(selected.hasChildren){
          action = 'handoff';
        }else{
          action = 'fire';
          confirm = true;
        }
      },
      submit: function(){
        switch (action){
          case 'fire':
            removeAssign(selected);
            break;
          case 'promote':
          case 'transfer':
          case 'employ':
            Persons.assignTo(selected, selected2);
            break;

          case 'handoff':
            Persons.assignTo(selected2, selected.parent);
            var cs = selected.children.concat();
            cs.forEach(function(p){
              Persons.assignTo(p, selected2);
            });
            removeAssign(selected);

            break;
        }

        Persons.cancelSelect();

      },
      cancelSelect: function(){
        selected = null;
        selected2 = null;
        action = null;
        confirm = null;
        alerts = [];
      },
      get unassigns(){
        return unassigns;
      },
      get tiers(){
        return tiers;
      },
      get selected(){
        return selected;
      },
      get selected2(){
        return selected2;
      },
      get action(){
        return action;
      },
      get alerts(){
        return alerts;
      },
      get confirm(){
        return confirm;
      },
      get transferCountLeft(){
        return transferCountLeft;
      },
      get employCountLeft(){
        return employCountLeft;
      }
    };
    return Persons;
  });
