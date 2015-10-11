'use strict';

angular.module('HockeyApp', ['ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap', 'ngDragDrop', 'ngResource', 'LocalStorageModule'])

  .constant('version', 'v0.0.1')
  .constant('user', 'Martin')

  .constant('linupsToDisplay', 4)

  .config(['$locationProvider', '$routeProvider', 'localStorageServiceProvider', function ($locationProvider, $routeProvider, localStorageServiceProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .when('/features', {
      templateUrl: 'views/features.html'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html'
    })
    .when('/test', {
      templateUrl: 'views/test.html',
      controller: 'testController'
    })
    .when('/game', {
      templateUrl: 'views/game.html',
      controller: 'gameController'
    })
    .when('/roster', {
      templateUrl: 'views/roster.html',
      controller: 'rosterController'
    })
    .when('/lineups', {
      templateUrl: 'views/lineups.html',
      controller: 'lineupsController'
    })
    .when('/team', {
      templateUrl: 'views/team.html',
      controller: 'teamController'
    })
    .when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'settingsController'
    })
    .when('/user', {
      templateUrl: 'views/user.html',
      controller: 'userController'
    })
    .when('/oauthredirect/:code/:token*', {
      templateUrl: 'views/home.html',
      controller: 'oauthController'
    })
    .otherwise({
      redirectTo: '/'
    });

    localStorageServiceProvider.setPrefix('ls');
  }]);
