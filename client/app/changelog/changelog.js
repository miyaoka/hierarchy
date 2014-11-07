'use strict';

angular.module('hierarchyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.changelog', {
        url: '/changelog',
        templateUrl: 'app/changelog/changelog.html',
        controller: 'ChangelogCtrl'
      });
  });