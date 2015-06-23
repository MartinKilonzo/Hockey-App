'use strict';

angular.module('HockeyApp')

.controller('gameController', ['$scope','$log', 'localStorageService', function($scope, $log, localStorageService) {

	console.log("Loaded Game Controller.");

	$scope.pageClass = 'page-game';

	var savedPlayers = localStorageService.get('players');
	var savedLineups = localStorageService.get('lineups');
	var savedActivePlayers = localStorageService.get('activePlayers');

	$scope.players = savedPlayers || [];
	$scope.lineups = savedLineups || [];
	$scope.activePlayers = savedActivePlayers || [];

	$scope.setSelection = function (selection) {
		$scope.currentSelection = selection;
	};

	$log.info($scope.activePlayers[1] === true);


  }]);
