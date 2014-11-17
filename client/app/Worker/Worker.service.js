'use strict';

angular.module('hierarchyApp')
  .factory('Worker', function (Util) {

    function Worker(arg) {
      arg = arg ? arg : {};
      this.id = Util.vals(arg.id, Util.uuid);
      this.age = Util.vals(arg.age, 0);
      this.origSkill = Util.vals(arg.origSkill, 0);
      this.name = Util.vals(arg.name, null);
      this.relations = Util.vals(arg.relations, {});
      this.lastSkill = 0;
    };

    Worker.import = function(){

    }

    Worker.prototype = {
      get skill(){
        return this.origSkill + 20;
      },
      export: function(){
        return {
          id: this.id,
          age: this.age,
          origSkill: this.origSkill,
          name: this.name,
          relations: this.relations
        }
      },
      advanceAge: function(){
        this.age++;
        if(this.age >= 40){
          this.lastSkill = -( (Math.random() > .2) ? 2 : 1);
        } else {
          this.lastSkill = ((Math.random() > .5) ? 1 : 0);
        }
        this.origSkill = Math.max(0, (this.origSkill + this.lastSkill));
//        this.relations[this.parent.id] = ((this.relations[this.parent.id] == null) ? 1 : this.relations[this.parent.id]+1);
      },

    };

    return Worker;
  });
