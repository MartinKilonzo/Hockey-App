'use strict';

angular.module('HockeyApp')

.controller('gameController', ['$scope', '$log', '$resource', 'localStorageService', 'gameAPI', 'gameData', 'actionService', 'Action', 
	function ($scope, $log, $resource, localStorageService, gameAPI, gameData, actionService, Action) {

		console.log('Loaded Game Controller.');

		var gamedb = $resource('/api/gamedb');

		$scope.pageClass = 'page-game';

	/*
	 *	Initialization of players and lineups from database.
	 */
	 gameAPI.getPlayers( function (result) {
	 	$scope.players = result;

	 	gameAPI.getLineups( function (result) {
	 		$scope.lineups = result;
	 	});
	 });

	$scope.activePlayers = gameData.getPlayers() || [];		// Initialize game board

	var initializeGameEvents = function () {
		var newGame = {
			shotsOn: [],
			shotsAgainst: [],
			teamGoals: [],
			opponentGoals: []
		};

		var newGameStats = [newGame, newGame, newGame, newGame];

		$scope.gameEvents = gameData.gameEvents || newGameStats;
	};
	initializeGameEvents();

	$scope.execuStack = actionService;
	$scope.undoable = $scope.execuStack.undoable;
	$scope.redoable = $scope.execuStack.redoable;

	var shotsOnId = gameData.shotsOnId || 0;
	var shotsAgainstId = gameData.shotsAgainstId || 0; 
	var teamGoalsId = gameData.teamGoalsId || 0; 
	var opponentGoalsId = gameData.opponentGoalsId || 0;
	
	// Undo and Redo Support //
	$scope.undo = function () {
		$scope.execuStack.undo();
		gameData.update($scope.activePlayers, $scope.period);
	};

	$scope.redo = function () {
		$scope.execuStack.redo();
		gameData.update($scope.activePlayers, $scope.period);
	};

	// Game Toggle Functions //
	/*
	 * Function which sets the period which is to be recorded in each game event. 
	 * Accepted values range from 1-4, representing 1st - Overtime
	 */
	 $scope.setPeriod = function (period) {
	 	if (period >= 1 || period <= 4) {
	 		var oldVal = {
	 			period: $scope.period,
	 			shotsOnId: shotsOnId,
	 			shotsAgainstId: shotsAgainstId, 
	 			teamGoalsId: teamGoalsId,
	 			opponentGoalsId: opponentGoalsId
	 		};

	 		var newVal = {
	 			period: period
	 		};
	 		var periodAction = new Action(oldVal, newVal, function (val) {
	 			$scope.period = val.period;
	 			shotsOnId = val.shotsOnId || 0;
	 			shotsAgainstId = val.shotsAgainstId || 0;
	 			teamGoalsId = val.teamGoalsId || 0;
	 			opponentGoalsId = val.opponentGoalsId || 0;
	 		});

	 		if ($scope.period) { 
	 			$scope.execuStack.push(periodAction);
	 			gameAPI.saveGameEvents($scope.gameEvents[$scope.period - 1]);
	 		}	// If the period has never been initialized,
	 		else { periodAction.execute(); }								// Initialize it without adding it to the action stack
	 		gameData.update($scope.activePlayers, $scope.period);
	 	}
	 };

	 $scope.setPeriod(gameData.getPeriod() || 1);	// Initialize the period if it has been saved

	// Game Event Functions
	/*
	 * Constructor for game event objects that records the game number (ID), period, 
	 * time within a game and the change of an attribute.
	 */
	 var GameEvent = function (eventId, period, activePlayers, time, count) {
	 	this.game = 0,//$scope.gameDetails.gameNumber;
	 	this.eventId = eventId;
	 	this.period = period;
	 	this.activePlayers = activePlayers;
	 	this.time = time;
	 	this.count = count;
	 };

	 /*
	  * Function which returns the game time, formatted as hh:mm:ss.tshsms
	  */
	  var getGameTime = function () {
	  	if (!$scope.gameStart)
	  		return '0';

	  	return $scope.gameHours.toString() + ':' + $scope.formatMinutes() + ':' +  $scope.formatSeconds();
	  };

	/*
	 *	Function which increments the Shots On statistic for each player involved in the play (active player).
	 */
	 $scope.addShotsOn = function () {
	 	var newGameEvent = new GameEvent(shotsOnId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), 1);

		// applier
		// For each active player:
		var applier = function (GameEvent) {
			var activePlayers = [];
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.shotsOn.push(GameEvent);
				activePlayers.push($scope.activePlayers[i].playerNumber);
			}
			GameEvent.activePlayers = activePlayers;
			$scope.gameEvents[$scope.period - 1].shotsOn.push(GameEvent);
			shotsOnId++;
		};

		// unApplier
		// For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.shotsOn.pop();
			}
			$scope.gameEvents[$scope.period - 1].shotsOn.pop();
			shotsOnId--;
		};

		var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

		$scope.execuStack.push(newGameAction);
	};

	/*
	 *	Function which decrements the Shots On statistic for each player involved in the play (active player).
	 */
	 $scope.subtShotsOn = function () {
	 	var newGameEvent = new GameEvent(shotsOnId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), -1);

		// applier
		// For each active player:
		var applier = function (GameEvent) {
			var activePlayers = [];
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.shotsOn.push(GameEvent);
				activePlayers.push($scope.activePlayers[i].playerNumber);
			}
			GameEvent.activePlayers = activePlayers;
			$scope.gameEvents[$scope.period - 1].shotsOn.push(GameEvent);
			shotsOnId++;
		};

		// unApplier
		// For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.shotsOn.pop();
			}
			$scope.gameEvents[$scope.period - 1].shotsOn.pop();
			shotsOnId--;
		};

		var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

		$scope.execuStack.push(newGameAction);
	};

	/*
	 *	Function which increments the Shots Against statistic for each player involved in the play (active player).
	 */
	 $scope.addShotsAgainst = function () {
	 	var newGameEvent = new GameEvent(shotsAgainstId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), 1);

		// applier
		// For each active player:
		var applier = function (GameEvent) {
			var activePlayers = [];
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.shotsAgainst.push(GameEvent);
				activePlayers.push($scope.activePlayers[i].playerNumber);
			}
			GameEvent.activePlayers = activePlayers;
			$scope.gameEvents[$scope.period - 1].shotsAgainst.push(GameEvent);
			shotsAgainstId++;
		};

		// unApplier
		// For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.shotsAgainst.pop();
			}
			$scope.gameEvents[$scope.period - 1].shotsAgainst.pop();
			shotsAgainstId--;
		};

		var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

		$scope.execuStack.push(newGameAction);
	};

	/*
	 *	Function which decrements the Shots Against statistic for each player involved in the play (active player).
	 */
	 $scope.subtShotsAgainst = function () {
	 	var newGameEvent = new GameEvent(shotsAgainstId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), -1);

		// applier
		// For each active player:
		var applier = function (GameEvent) {
			var activePlayers = [];
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.shotsAgainst.push(GameEvent);
				activePlayers.push($scope.activePlayers[i].playerNumber);
			}
			GameEvent.activePlayers = activePlayers;
			$scope.gameEvents[$scope.period - 1].shotsAgainst.push(GameEvent);
			shotsAgainstId++;
		};

		// unApplier
		// For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.shotsAgainst.pop();
			}
			$scope.gameEvents[$scope.period - 1].shotsAgainst.pop();
			shotsAgainstId--;
		};

		var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

		$scope.execuStack.push(newGameAction);
	};

	/*
	 *	Function which increments the Team Goal statistic for each player involved in the play (active player).
	 */
	 $scope.addTeamGoal = function () {
	 	var newGameEvent = new GameEvent(teamGoalsId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), 1);

		// applier
		// For each active player:
		var applier = function (GameEvent) {
			var activePlayers = [];
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.teamGoals.push(GameEvent);
				activePlayers.push($scope.activePlayers[i].playerNumber);
			}
			GameEvent.activePlayers = activePlayers;
			$scope.gameEvents[$scope.period - 1].teamGoals.push(GameEvent);
			teamGoalsId++;
		};

		// unApplier
		// For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.teamGoals.pop();
			}
			$scope.gameEvents[$scope.period - 1].teamGoals.pop();
			teamGoalsId--;
		};
		
		var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

		$scope.execuStack.push(newGameAction);
	};

	/*
	 *	Function which increments the Opponent Goal statistic for each player involved in the play (active player).
	 */
	 $scope.addOpponentGoal = function () {
	 	var newGameEvent = new GameEvent(opponentGoalsId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), 1);

		// applier
		// For each active player:
		var applier = function (GameEvent) {
			var activePlayers = [];
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.opponentGoals.push(GameEvent);
				activePlayers.push($scope.activePlayers[i].playerNumber);
			}
			GameEvent.activePlayers = activePlayers;
			$scope.gameEvents[$scope.period - 1].opponentGoals.push(GameEvent);
			opponentGoalsId++;
		};

		// unApplier
		// For each active player:
		var unApplier = function () {
			for (var i = 0; i < $scope.activePlayers.length; i++) {
				$scope.activePlayers[i].games[$scope.gameNumber].gameEvents.opponentGoals.pop();
			}
			$scope.gameEvents[$scope.period - 1].opponentGoals.pop();
			opponentGoalsId--;
		};

		var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

		$scope.execuStack.push(newGameAction);
	};


	// TODO: Game History Functions //
	
	// Game Board Functions //
	/*
	 * Function which sets the position where a player substitution is supposed to occur.
	 */
	 $scope.setSelectedPosition = function (selection) {
	 	$scope.positionSelection = selection;
	 };


	 /*
	  * Function which resets the selected position (where a player substitution is supposed to occur)
	  * upon clicking "outside of the aciton.
	  */
	  $scope.resetSelection = function () {
	  	$scope.positionSelection = undefined;
	  };

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

	 	for (var i = 0; i < newActivePlayers.length; i++) {
	 		if (!newActivePlayers[i].games[$scope.gameNumber]) {
	 			var newGameEvents = {
	 				shotsOn: [],
	 				shotsAgainst: [],
	 				teamGoals: [],
	 				opponentGoals: []
	 			};
	 			var newGame = {
	 				gameEvents: newGameEvents
	 			};
	 			newActivePlayers[i].games[$scope.gameNumber] = newGame;
	 		}
	 	}

	 	var newAction = new Action($scope.activePlayers, newActivePlayers, function (newLineup) {
	 		$scope.activePlayers = newLineup;
	 	});

	 	$scope.execuStack.push(newAction);
	 	gameData.update($scope.activePlayers, $scope.period);
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


	 // Player Pool Functions

	/*
	 * Function which swaps the current selected position with the selected player.
	 */
	 $scope.swapPlayer = function (index) {

	 	// Create the player's game event lists if they do not exist for this particalar game, ie. on first substitution.
	 	if (!$scope.players[index].games[$scope.gameNumber]) {
	 		var newGameEvents = {
	 			shotsOn: [],
	 			shotsAgainst: [],
	 			teamGoals: [],
	 			opponentGoals: []
	 		};
	 		var newGame = {
	 			gameEvents: newGameEvents
	 		};
	 		$scope.players[index].games[$scope.gameNumber] = newGame;
	 	}

	 	var oldPlayerSwap = {
	 		player: $scope.activePlayers[$scope.positionSelection],
	 		index: $scope.positionSelection
	 	};

	 	var newPlayerSwap = {
	 		player: $scope.players[index],
	 		index: $scope.positionSelection
	 	};

	 	var newAction = new Action(oldPlayerSwap, newPlayerSwap, function (playerSwap) {
	 		$scope.activePlayers[playerSwap.index] = playerSwap.player;
	 	});

	 	$scope.execuStack.push(newAction);
	 	gameData.update($scope.activePlayers, $scope.period);
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

	}])

.controller('timerController', ['$scope', 'gameTimerFactory', 
	function ($scope, gameTimerFactory) {
		$scope.gameTimer = gameTimerFactory;
	}]);
