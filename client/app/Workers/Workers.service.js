'use strict';

angular.module('hierarchyApp')
  .factory('Workers', function (Worker, Nodes, Roots) {
    var _list = [];
    var _indexes = {};

    function updateIndex(){
      _indexes = {};
      _list.forEach(function(item, index){
        _indexes[item.id] = index;
      });
    }
    var Workers = {
      get index() {
        return _list;
      },
      create: function(){
        var item = new Worker();
        var len = _list.push(item);
        _indexes[item.id] = len - 1;

        return item;
      },
      show: function(id){
        var i = _indexes[id];
        return _list[i];
      },
      /*
      update: function(id, item){
        var i = _indexes[id];
        _list[i] = item;
      },
      */
      destroy: function(id){
        var i = _indexes[id];
        delete _list[i];
        _list.splice(i, 1);
        updateIndex();
      },
      import: function(list){
        _list = [];
        list.forEach(function(item){
          _list.push(new Worker(item));
        });
        updateIndex();
      },
      export: function(){
        var out = [];
        _list.forEach(function(item){
          out.push(item.export());
        })
        return out;
      },
      createNewGrads:function(){
        var w = Workers.create();
        var n = Nodes.createFrom(Roots.newGrad);
        n.workerId = w.id;

        var age = Math.random() * 5;
        while(--age > 0){
          w.advanceAge();
        }
      },
      createMidCareers: function(){
        var w = Workers.create();
        var n = Nodes.createFrom(Roots.midCareer);
        n.workerId = w.id;

        var age = Math.random() * 25 + 10;
        while(--age > 0){
          w.advanceAge();
        }
        w.origSkill = Math.floor(w.origSkill * .9);
      },

    };
    return Workers;
  });
