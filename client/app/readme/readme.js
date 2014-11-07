'use strict';

angular.module('hierarchyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.readme', {
        url: '/readme',
        templateUrl: 'app/readme/readme.html',
        controller: 'ReadmeCtrl'
      });
  });