'use strict';

angular.module('HockeyApp')

.controller('gameController', ['$scope','localStorageService', function($scope, localStorageService) {

	console.log("Loaded Game Controller.");

	$scope.pageClass = 'page-game';

	var savedPlayers = localStorageService.get('players');
	var savedLineups = localStorageService.get('lineups');

	$scope.players = savedPlayers || [];
	$scope.lineups = savedLineups || [];

  }]);
