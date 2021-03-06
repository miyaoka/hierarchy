'use strict';

angular.module('hierarchyApp')
  .factory('Person', function () {
    var lastId = 0;
    var faceCount = 505;
    var maxAge = 40;

    function Person(age){
      this.id = lastId++;
      this.origSkill = 0;
      this.age = 0;

      var _age = age != null ? age : Math.floor(Math.random()*35);
      _age = Math.max(0, Math.min(maxAge, _age));
      while(_age-- > 0){
        this.advanceAge();
      }
      this.lastSkill = 0;

      this.parent = null;
      this.children = [];
      this.name = '';
      this.face = Math.floor(Math.random() * faceCount);
      this.career = 0;
    }

    Person.prototype = {
      get skill(){
        return Math.max(0, this.origSkill - this.children.length);
      },
      get childSum(){
        return this.parent ? this.skill * this.children.length : 0;
        var val = 0;
        var parentSkill = this.skill;
        var isRoot = this.parent ? false : true;
        this.children.forEach(function(c){
          val += isRoot ? c.skill : Math.min(parentSkill, c.skill);
        });
        return val;
      },
      get hasChildren(){
        return this.children.length > 0 ? true : false;
      },
      advanceAge: function(){
        this.age++;
        if(this.age >= 40){
          this.lastSkill = -( (Math.random() > .2) ? 2 : 1)
        } else {
          this.lastSkill = (Math.random() > .5) ? 1 : 0
        }
        this.origSkill = Math.max(0, (this.origSkill + this.lastSkill));
        this.career++;
      },
      get isAnger(){
        var parent = this.parent;
        return (parent != null && !parent.isRoot && parent.skill < this.skill) ? true : false;
      }
    }



    return Person;
  });
