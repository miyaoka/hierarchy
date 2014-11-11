'use strict';

angular.module('hierarchyApp')
  .factory('Persons', function (Person) {
    var orgRoot = new Person();
    orgRoot.isRoot = true;
    var newGradsRoot = new Person();
    newGradsRoot.isRoot = true;
    var midCareersRoot = new Person();
    midCareersRoot.isRoot = true;

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
      //親から取り除く
      var i;
      person.parent.children.some(function(p, idx, ary){
        if(p === person){
          ary.splice(idx,1);
          i = idx;
          return true;
        }
        return false
      });
      person.parent = null;
      return i;
    }
    var Persons = {
      get root(){
        return orgRoot;
      },
      get newGradsRoot(){
        return newGradsRoot;
      },
      get midCareersRoot(){
        return midCareersRoot;
      },
      create: function (age) {
        unassigns.push(new Person(age));
      },
      createNewGrads:function(){
        var p = new Person( Math.floor(Math.random()*5) );
        newGradsRoot.children.push(p);
        p.parent = newGradsRoot;
      },
      createMidCareers: function(){
        var p = new Person( Math.floor(Math.random()*28)+10);
        p.origSkill = Math.floor(p.origSkill * .9);
        midCareersRoot.children.push(p);
        p.parent = midCareersRoot;
      },
      nextYear : function(){
        midCareersRoot.children.forEach(function(v,i,ua){
          if(Math.random() > .2){
            ua.splice(i,1);
          }
        });
        newGradsRoot.children = [];
        var newCount = Math.random() * 3;
        while(newCount-- > 0){
          this.createNewGrads();
        }
        var careerCount = Math.random() * 5;
        while(careerCount-- > 0){
          this.createMidCareers();
        }

      },
      handoff: function(from, to){
        var parent = from.parent;
        var children = from.children.concat();
        var i = removeAssign(from);

        children.forEach(function(c){
          Persons.assignTo(c, to);
        });

        removeAssign(to);

        //新規配属先設定
        parent.children.splice(i, 0, to);

        to.parent = parent;
        to.assigned = true;


      },
      assignTo: function(person, parent) {

        removeAssign(person);

        //新規配属先設定
        parent.children.push(person);

        person.parent = parent;
        person.assigned = true;

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
        if(action == 'handoff'){
          if(selected2.tier < selected.tier && selected2.assigned){
            alerts.push('後任者の地位が高すぎます');
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
        return orgRoot.hasChildren;
      },
      employ: function(){
        if(Persons.hasTop){
          action = 'employ';
          return;
        }
        Persons.assignTo(selected, orgRoot);
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
            Persons.handoff(selected, selected2);

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
