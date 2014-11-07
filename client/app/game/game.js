'use strict';

angular.module('hierarchyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.game', {
        url: '/',
        templateUrl: 'app/game/game.html',
        controller: 'GameCtrl'
      });
  });