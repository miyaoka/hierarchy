'use strict';

angular.module('hierarchyApp')
  .factory('Roots', function (Nodes) {
   var Roots = {
      orgs: [],
      newGrad: null,
      midCareer: null,
      import: function(arg){
        Roots.orgs = arg.orgs;
        Roots.newGrad = arg.newGrad;
        Roots.midCareer = arg.midCareer;
      },
      export: function(){
        return {
          orgs: Roots.orgs,
          newGrad: Roots.newGrad,
          midCareer: Roots.midCareer
        }
      },
      init: function(){
        var newGrad = Nodes.create();
        newGrad.name = '新卒';
        var midCareer = Nodes.create();
        midCareer.name = '中途';
        var org = Nodes.create();
        org.name = 'とある企業';

        Roots.newGrad = newGrad.id;
        Roots.midCareer = midCareer.id;
        Roots.orgs.push(org);
      }

    };
    return Roots;
  });
