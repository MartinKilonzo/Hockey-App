'use strict';

angular.module('HockeyApp', ['ngAnimate', 'ngCookies', 'ui.router', 'ui.bootstrap', 'ngDragDrop', 'ngResource', 'LocalStorageModule'])

  .constant('version', 'v0.0.1')

  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.when('/lala', 'team');
    $urlRouterProvider.otherwise('/lala');
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    // .state('features', {
    //   url: '/features',
    //   templateUrl: 'views/features.html'
    // })
    // .state('contact', {
    //   url: '/contact',
    //   templateUrl: 'views/contact.html'
    // })
    .state('test', {
      url: '/test',
      templateUrl: 'views/test.html',
      controller: 'testController'
    })
    .state('game', {
      url: '/game',
      templateUrl: 'views/game.html',
      controller: 'gameController'
    })
    .state('roster', {
      url: '/roster',
      templateUrl: 'views/roster.html',
      controller: 'rosterController'
    })
    .state('lineups', {
      url: '/lineups',
      templateUrl: 'views/lineups.html',
      controller: 'lineupsController'
    })
    .state('team', {
      url: '/team',
      templateUrl: 'views/team.html',
      controller: 'teamController'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'views/settings.html',
      controller: 'settingsController'
    })
    .state('user', {
      url: '/user',
      templateUrl: 'views/user.html',
      controller: 'userController'
    })
    .state('oauthredirect', {
      url: '/oauthredirect',
      templateUrl: 'views/home.html',
      controller: 'oauthController'
    });

    localStorageServiceProvider.setPrefix('ls');
  }]);
