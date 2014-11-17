'use strict';

angular.module('hierarchyApp')
  .factory('Data', function (Roots, Nodes, Workers, localStorageService) {
    var _save = null;
    var storeKey = 'data';
    var Data = {
      init: function () {

        var data = localStorageService.get(storeKey);
        if(data){
          _save = data;
          Data.load();
          return;
        }

        Roots.init();

        var i;
        i = 3;
        while(i-- > 0){
          Workers.createNewGrads();
        }
        i = 5;
        while(i-- > 0){
          Workers.createMidCareers();
        }

      },
      clear: function(){
        localStorageService.remove(storeKey);
      },
      save: function() {
        _save = Data.export();

        localStorageService.set(storeKey, _save);
      },
      load: function() {
        if(_save){
          Data.import(_save);
        }
      },
      import: function(data) {
        Roots.import(data.roots);
        Nodes.import(data.nodes);
        Workers.import(data.workers);
      },
      export: function() {
        return {
          roots: Roots.export(),
          nodes: Nodes.export(),
          workers: Workers.export()
        };
      }
    };
    return Data;
  });
