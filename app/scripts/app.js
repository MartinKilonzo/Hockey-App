'use strict';

angular.module('HockeyApp', ['ngAnimate', 'ngCookies', 'ngRoute'])

  .constant('version', 'v0.0.1')
  .constant('user', 'Martin')

  /* Google Drive API Constants */
  .constant('CLIENT_ID', '1031466315037-mri5opmcirkisus3fllv97q2oakgenfa.apps.googleusercontent.com')
  .constant('CLIENT_SECRET', 'F22W0vouWOAcKnJdL0gtgOn1')
  .constant('REDIRECT_URL', 'https://www.example.com/oauth2callback')

  .constant('linupsToDisplay', 4)

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
