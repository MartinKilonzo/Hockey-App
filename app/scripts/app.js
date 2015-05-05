'use strict';

angular.module('HockeyApp', ['ngAnimate', 'ngCookies', 'ngRoute'])

  .constant('version', 'v0.0.1')
  .constant('user', 'Martin')

  .config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/features', {
        templateUrl: 'views/features.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'gameController',
      })
      .when('/roster', {
        templateUrl: 'views/roster.html',
        controller: 'rosterController'
      })
      .when('/team', {
        templateUrl: 'views/team.html',
        controller: 'teamController'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'settingsController'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
