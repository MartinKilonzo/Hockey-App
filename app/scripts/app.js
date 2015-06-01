'use strict';

angular.module('HockeyApp', ['ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap','ngDragDrop', 'LocalStorageModule'])

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
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
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
    .otherwise({
      redirectTo: '/',
    });

  })

  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  }])

  .factory('TeamFactory', function TeamFactory() {
    var team = localStorageService.get('players') || [];
    var team = [];

    return {
      add: function (player) {
        this.team.push(player);
      },
      getPlayer: function (number) {
        return this.team[number];
      },

      getTeam: function() {
        return this.team;
      }
    };
  })

.factory('PlayerFactory', function (playerInfo) {
  console.log("NEW PLAYER");
  var Player =  function () {
    info = playerInfo.replace(/, /g, '/').replace(/,/g, '/').split('/');

    console.log(info);

    this.firstName      = info[0];
    this.lastName       = info[1];
    this.playerNumber   = info[2];
    this.position       = info[3];
  };
  return Player;
});
