'use strict';

angular.module('hierarchyApp')
  .factory('Util', function (rfc4122) {
    var Util = {
      get uuid() {
        return rfc4122.v4();
      },
      vals : function(val1, val2){
        return (val1 != null) ? val1 : val2
      },
      limitKeys: function(obj, keys){
        var out = {};
        keys.forEach(function(key){
          out[key] = obj[key];
        });
        return out;
      }
    };
    return Util;
  });
