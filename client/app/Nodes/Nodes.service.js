'use strict';

angular.module('hierarchyApp')
  .factory('Nodes', function (Node) {
    var _list = [];
    var _nodeIndex = {};
    var _workerIndex = {};
    var _parentIndex = {};

    function updateIndex(){
      _nodeIndex = {};
      _workerIndex = {};
      _parentIndex = {};
      _list.forEach(function(node, listIndex){
        _nodeIndex[node.id] = listIndex;
        node.children.forEach(function(c){
          _parentIndex[c.id] = listIndex;
        });
        if(node.workerId != null){
          _workerIndex[node.workerId] = listIndex;
        }
      });
    }
    function _destroy(nid){
      _list.some(function(node, i, ary){
        if(node.id == nid){
          ary.splice(i, 1);
          node.children.forEach(function(cid){
            _destroy(cid);
          });
          node = null;
          return true;
        }
        return false;
      });
    }


    var Nodes = {
      get index() {
        return _list;
      },
      create: function(){
        var item = new Node();
        _list.push(item);
        updateIndex();
        return item;
      },
      createFrom: function(pid){
        var n = Nodes.create();
        var pnode = Nodes.show(pid);
        pnode.children.push(n.id);
        n.parentId = pnode.id;
        n.rootId = pnode.rootId;
        n.tier = pnode.tier + 1;
        return n;
      },
      show: function(nid){
        var i = _nodeIndex[nid];
        return _list[i];
      },
      destroy: function(nid){
        var node = Nodes.show(nid);
        if(node.parentId){
          var p = Nodes.show(node.parentId);
          p.children.some(function(cid, i, ary){
            if(cid == nid){
              ary.splice(i, 1);
              return true;
            }
            return false;
          })
        }
        _destroy(nid);
        updateIndex();
      },
      import: function(list){
        _list = [];
        list.forEach(function(item){
          _list.push(new Node(item));
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
      byWorkerId: function(wid){
        var i = _workerIndex[wid];
        return i != null ? _list[i] : 1;
      },
      parentNode: function(nid){
        var i = _parentIndex[nid];
        return _list[i];
      },
      rootNode: function(nid){
        var node = Nodes.show(nid);
        var parent = Nodes.parentNode(nid);
        while(parent){
          node = parent;
          parent = Nodes.parentNode(node.id);
        }
        return node;
      }


    };
    return Nodes;
  });
