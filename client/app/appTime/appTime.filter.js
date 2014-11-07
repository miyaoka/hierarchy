'use strict';

angular.module('hierarchyApp')
  .filter('appTime', function ($filter) {
    return function (date) {
      return [
        date.getFullYear() - 2000,
        $filter('date')(date, '年目'),
      ].join('');
    };
  });
