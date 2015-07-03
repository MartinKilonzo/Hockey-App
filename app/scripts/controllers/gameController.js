'use strict';

angular.module('HockeyApp')

.controller('gameController', ['$scope', '$log', '$timeout', 'localStorageService', function($scope, $log, $timeout, localStorageService) {

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


	// Undo and Redo Functionality //

	//Regular Actions
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

	//Game Button Actions
	var gameAction = function (newVal, applier, unApplier) {
		this.newVal = newVal;
		this.applier = applier;
		this.unApplier = unApplier;
		console.log(this);
	};

	gameAction.prototype.execute = function () {
		this.applier(this.newVal);
	};

	gameAction.prototype.unExecute = function () {
		this.unApplier(this.oldVal);
	};

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

	
	// Game Toggle Functions //

	// Game Timer Functions
	var nextCall;
	var timerUnit = 47; // 47 chosen as it is a prime near 50 ms that is large enough to change the ms value frequently
	var timers = [];

	$scope.startTimer = function () {
		if (!$scope.startTime) {
			$scope.startTime = new Date().getTime();
			$scope.gameSeconds = $scope.gameMinutes = $scope.gameHours = 0;
			nextCall = $scope.startTime;
		}

		nextCall += timerUnit;

		var drift = (new Date().getTime() - $scope.startTime) % timerUnit;

		updateClock();

		timers.push($timeout($scope.startTimer, nextCall - new Date().getTime(), $scope.gameInPlay));
	};

	$scope.stopTimer = function () {
		// Cancel the $timeout timers
		for (var i = 0; i < timers.length; i++) {
			$timeout.cancel(timers[i]);
		}
		timers = [];
	};

	var updateClock = function () {
		var newTime;

		// Update seconds
		newTime = $scope.gameSeconds + timerUnit / 1000;
		$scope.gameSeconds = newTime % 60;

		// Update minutes
		newTime = ($scope.gameMinutes + (newTime / 60) | 0);
		$scope.gameMinutes = newTime % 60;

		// Update hours
		$scope.gameHours += (newTime / 60) | 0;
	};

	$scope.formatSeconds = function () {
		var str = $scope.gameSeconds.toString().split(".");

		// NULL case ie. no decimal
		if (!str[1])
			str[1] = '000';

		// While the whole portion has less than two digits, add padding
		while (str[0].length < 2)
			str[0] = '0' + str[0];

		//Truncate
		str[1] = str[1].slice(0, 3);

		// While the fractional portion has less than three digits, add padding
		while (str[1].length < 3)
			str[1] += '0';
		var str = str[0] + '.' + str[1];
		// Return the padded string
		return str;
	};

	// Game Flag Functions
	/*
	 * Constructor for game event objects that records the game number (ID), period, 
	 * time within a game and the change of an attribute.
	 */
	 var gameEvent = function (gameNumber, period, time, count) {
	 	this.game = gameNumber;
	 	this.period = period;
	 	this.time = time;
	 	this.count = count;
	 };

	/*
	 *	Function which increments the Shots On statistic for each player involved in the play (active player).
	 */
	 $scope.addShotsOn = function () {
		//applier
		//For each active player:
		var applier = function (gameEvent) {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].shotsOn.push(gameEvent);
			}
		}

		//unApplier
		//For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].shotsOn.splice($scope.activePlayers[i].shotsOn.length - 1, 1);
			}
		}

		var newGameEvent = new gameEvent($scope.gameNumber, $scope.period, getTime(), 1);
		var newGameAction = new gameAction(newGameEvent, applier, unApplier);

		execuStack.push(newGameAction);
		newGameAction.execute();
	};

	/*
	 *	Function which decrements the Shots On statistic for each player involved in the play (active player).
	 */
	 $scope.subtShotsOn = function () {
		//applier
		//For each active player:
		var applier = function (gameEvent) {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].shotsOn.push(gameEvent);
			}
		}

		//unApplier
		//For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].shotsOn.splice($scope.activePlayers[i].shotsOn.length - 1, -1);
			}
		}

		var newGameEvent = new gameEvent($scope.gameNumber, $scope.period, getTime(), 1);
		var newGameAction = new gameAction(newGameEvent, applier, unApplier);

		execuStack.push(newGameAction);
		newGameAction.execute();
	};

	/*
	 *	Function which increments the Shots Against statistic for each player involved in the play (active player).
	 */
	 $scope.addShotsAgainst = function () {
		//applier
		//For each active player:
		var applier = function (gameEvent) {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].shotsAgainst.push(gameEvent);
			}
		}

		//unApplier
		//For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].shotsAgainst.splice($scope.activePlayers[i].shotsAgainst.length - 1, 1);
			}
		}

		var newGameEvent = new gameEvent($scope.gameNumber, $scope.period, getTime(), 1);
		var newGameAction = new gameAction(newGameEvent, applier, unApplier);

		execuStack.push(newGameAction);
		newGameAction.execute();
	};

	/*
	 *	Function which decrements the Shots Against statistic for each player involved in the play (active player).
	 */
	 $scope.subtShotsAgainst = function () {
		//applier
		//For each active player:
		var applier = function (gameEvent) {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].shotsAgainst.push(gameEvent);
			}
		}

		//unApplier
		//For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].shotsAgainst.splice($scope.activePlayers[i].shotsAgainst.length - 1, -1);
			}
		}

		var newGameEvent = new gameEvent($scope.gameNumber, $scope.period, getTime(), 1);
		var newGameAction = new gameAction(newGameEvent, applier, unApplier);

		execuStack.push(newGameAction);
		newGameAction.execute();
	};

	/*
	 *	Function which increments the Team Goal statistic for each player involved in the play (active player).
	 */
	 $scope.addTeamGoal = function () {
		//applier
		//For each active player:
		var applier = function (gameEvent) {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].teamGoals.push(gameEvent);
			}
		}

		//unApplier
		//For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].teamGoals.splice($scope.activePlayers[i].teamGoals.length - 1, 1);
			}
		}

		var newGameEvent = new gameEvent($scope.gameNumber, $scope.period, getTime(), 1);
		var newGameAction = new gameAction(newGameEvent, applier, unApplier);

		execuStack.push(newGameAction);
		newGameAction.execute();
	};

	/*
	 *	Function which increments the Opponent Goal statistic for each player involved in the play (active player).
	 */
	 $scope.addOpponentGoal = function () {
		//applier
		//For each active player:
		var applier = function (gameEvent) {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].opponentGoals.push(gameEvent);
			}
		}

		//unApplier
		//For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$log.info(getTime());
				$scope.activePlayers[i].opponentGoals.splice($scope.activePlayers[i].opponentGoals.length - 1, 1);
			}
		}

		var newGameEvent = new gameEvent($scope.gameNumber, $scope.period, getTime(), 1);
		var newGameAction = new gameAction(newGameEvent, applier, unApplier);

		execuStack.push(newGameAction);
		newGameAction.execute();
	};


	// Game History Functions //


	
	// Game Board Functions //


	/*
	 * Function which sets the position where a player substitution is supposed to occur.
	 */
	 $scope.setSelectedPosition = function (selection) {
	 	$scope.positionSelection = selection;
	 };


	// Game button Functions //


	


	
	// Lineup and Player Pool Functions //


	
	// Lineup Functions
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


	 //Player Pool Functions

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
