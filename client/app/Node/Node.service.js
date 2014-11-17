'use strict';

angular.module('hierarchyApp')
  .factory('Node', function (Util) {
    function Node(arg) {
      arg = arg ? arg : {};
      this.id = Util.vals(arg.id, Util.uuid);
      this.name = Util.vals(arg.name, null);
      this.workerId = Util.vals(arg.workerId, null);
      this.children = Util.vals(arg.children, []);

      //getter cache
      this.parentId = null;
      this.rootId = this.id;
      this.tier = 0;
    }
    Node.prototype = {
      export: function(){
        return {
          id: this.id,
          name: this.name,
          workerId: this.workerId,
          children : this.children
        }
      }
    }
    return Node;
  });
