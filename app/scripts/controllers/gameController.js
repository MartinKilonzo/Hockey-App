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

	$scope.resetSelection = function () {
		// Resets all set selections on clicks elsewhere
	};

	// Game Toggle functions //
	// Game History functions //

	// Game Board functions //

	/*
	 * Function which sets the position where a player substitution is supposed to occur.
	 */
	 $scope.setSelectedPosition = function (selection) {
	 	$scope.positionSelection = selection;
	 };

	// Game button functions //

	// Lineup and Player Pool functions //

	// Lineup functions
	/*
	 * Function which sets the hover scope variable to be used with ng-class in 
	 * game-lineup for mouseover effects.
	 */
	$scope.setHover = function (index) {
		$scope.hover = index;
	};

	/*
	 * Function which sets the selection scope variable to indicate stylistically 
	 * which lineup will make the substitution.
	 */
	 $scope.setLineupSelection = function (selection) {
	 	$scope.lineupSelection = selection;
	 };

	/*
	 * Function which swaps the current active lineup with the selected one.
	 */
	 $scope.swapLineup = function (index) {
	 	$scope.activePlayers[0] = $scope.lineups[index].leftWing;
	 	$scope.activePlayers[1] = $scope.lineups[index].center;
	 	$scope.activePlayers[2] = $scope.lineups[index].rightWing;
	 	$scope.activePlayers[3] = $scope.lineups[index].defence1;
	 	$scope.activePlayers[4] = $scope.lineups[index].defence2;
	 };

	 /*
	  * Function which returns true if the lineup is currently active and false otherwise.
	  */
	  $scope.lineupSelected = function (index) {
	  	var selectedLineup = true;

	  	var lineup = [];

	  	lineup[0] = $scope.lineups[index].leftWing;
	  	lineup[1] = $scope.lineups[index].center;
	  	lineup[2] = $scope.lineups[index].rightWing;
	  	lineup[3] = $scope.lineups[index].defence1;
	  	lineup[4] = $scope.lineups[index].defence2;

	  	for (var j = 0; j < $scope.activePlayers.length; j++) {
	  		if (lineup[j].playerNumber != $scope.activePlayers[j].playerNumber) {
	  			selectedLineup = false;
	  			break;
	  		}
	  	}

	  	return selectedLineup;
	  };


	 var highlightSelected = function () {
	 	var selectedLineup = -1;

	 	// Find the correct lineup and highlight it:
	 	for (var i = 0; i < $scope.lineups.length && selectedLineup >= 0; i++) {
	 		var lineup = [];

	 		lineup[0] = $scope.lineups[index].leftWing;
	 		lineup[1] = $scope.lineups[index].center;
	 		lineup[2] = $scope.lineups[index].rightWing;
	 		lineup[3] = $scope.lineups[index].defence1;
	 		lineup[4] = $scope.lineups[index].defence2;

	 		selectedLineup = i;

	 		for (var j = 0; j < $scope.activePlayers.length; j++) {
	 			if ($scope.activePlayers[j] != lineup[j]) {
	 				selectedLineup = -1;
	 				break;
	 			}
	 		}
	 	}

	 	$scope.lineupSelection = selectedLineup;
	 };

	 // Player Pool functions

	/*
	 * Function which swaps the current selected position with the selected player.
	 */
	 $scope.swapPlayer = function (index) {
	 	$scope.activePlayers[$scope.positionSelection] = $scope.players[index];
	 };

	 /*
	  * Function which returns true if the player is currently active and false otherwise.
	  */
	 $scope.playerSelected = function (index) {
	 	var player = $scope.players[index];
	 	var playerSelected = false;

	 	for (var i = 0; i < $scope.activePlayers.length; i++) {
	 		var activePlayer = $scope.activePlayers[i];

	 		if (activePlayer && player.playerNumber === activePlayer.playerNumber)
	 		{
	 			playerSelected = true;
	 			break;
	 		}
	 	}

	 	return playerSelected;
	 };

	}]);
