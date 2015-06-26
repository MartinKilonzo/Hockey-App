'use strict';

angular.module('HockeyApp')

.controller('gameController', ['$scope', '$log', 'localStorageService', function($scope, $log, localStorageService) {

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

	var execuStack = [];
	var execuPointer = 0;

	execuStack.push = function(action) {
		execuStack[execuPointer] = action;
		execuPointer++;

		//Empty the older actions in the stack ie. the redo portion of the stack
		execuStack.length = execuPointer;
		console.log(this);
	};

	$scope.undo = function () {
		if ($scope.undoable) {
			execuPointer--;
			var undoAction = execuStack[execuPointer];
			undoAction.unExecute();
			console.log(execuStack);
			$log.info(execuPointer);
		}
	};

	$scope.redo = function () {
		if ($scope.redoable) {
			var redoAction = execuStack[execuPointer];
			redoAction.execute();
			execuPointer++;
			console.log(execuStack);
			$log.info(execuPointer);
		}
	};

	$scope.undoable = false;
	$scope.redoable = false;

	// Watch to see if undoing is possible
	$scope.$watch( function () { 
		return execuStack.length > 0 && execuPointer > 0;
	}, function (undoable) { 
		$scope.undoable = undoable;
	});

	// Watch to see if redoing is possible
	$scope.$watch( function () {
		return execuStack.length > 0 && execuPointer <= execuStack.length - 1;
	}, function (redoable) {
		$scope.redoable = redoable;
	});

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

	$scope.test = function (value)
	{
		var newValue = value + 3;

		var actionTest = new action(value, newValue, function (value) {
			$scope.testVal = value;
		});
		execuStack.push(actionTest);
		actionTest.execute();
	};

	var action = function (oldVal, newVal, applier) {
		this.oldVal = oldVal;
		this.newVal = newVal;
		this.applier = applier;
		console.log(this);
	};

	action.prototype.execute = function () {
		this.applier(this.newVal);
	};

	action.prototype.unExecute = function () {
		this.applier(this.oldVal);
	};

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
	 	var newActivePlayers = [];

	 	newActivePlayers[0] = $scope.lineups[index].leftWing;
	 	newActivePlayers[1] = $scope.lineups[index].center;
	 	newActivePlayers[2] = $scope.lineups[index].rightWing;
	 	newActivePlayers[3] = $scope.lineups[index].defence1;
	 	newActivePlayers[4] = $scope.lineups[index].defence2;

	 	var newAction = new action($scope.activePlayers, newActivePlayers, function (newLineup) {
	 		$scope.activePlayers = newLineup;
	 	});

	 	execuStack.push(newAction);
	 	newAction.execute();
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

	  	if (!$scope.activePlayers[0])
	  		selectedLineup = false;

	  	for (var j = 0; j < $scope.activePlayers.length; j++) {
	  		if (!$scope.activePlayers[j] || lineup[j].playerNumber !== $scope.activePlayers[j].playerNumber) {
	  			selectedLineup = false;
	  			break;
	  		}
	  	}

	  	return selectedLineup;
	  };

	 // Player Pool functions

	/*
	 * Function which swaps the current selected position with the selected player.
	 */
	 $scope.swapPlayer = function (index) {

		var oldPlayerSwap = {
			player: $scope.activePlayers[$scope.positionSelection],
			index: $scope.positionSelection
		};

		var newPlayerSwap = {
			player: $scope.players[index],
			index: $scope.positionSelection
		};

		var newAction = new action(oldPlayerSwap, newPlayerSwap, function (playerSwap) {
			$scope.activePlayers[playerSwap.index] = playerSwap.player;
		});

		$log.info(newAction);
		execuStack.push(newAction);
		newAction.execute();
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
