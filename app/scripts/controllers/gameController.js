'use strict';

angular.module('HockeyApp')

.controller('gameController', ['$scope', '$log', '$resource', '$modal', 'localStorageService', 'gameAPI', 'gameData', 'actionService', 'Action', 
	function ($scope, $log, $resource, $modal, localStorageService, gameAPI, gameData, actionService, Action) {

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

	var modalInstance = $modal.open({
		animation: true,
		templateUrl: 'views/partials/game/game-modal.html',
		controller: 'newGameModalController',
		size: 'lg',
		backdrop: 'static',
		keyboard: false
	});

	modalInstance.result.then( function (newGame) {
		gameData.initialize(newGame);
	}, function () {
		console.log('Modal Closed.');
	})['finally']( function () {
		modalInstance = undefined;
	});

	var GameEvents = function () {
		this.shotsOn = [];
		this.shotsAgainst = [];
		this.teamGoals = [];
		this.opponentGoals = [];
		this.timeOn = [];
		this.timeOff = [];
		this.zoneStarts = [];
	};

	var initializeGameEvents = function () {
		
		// Emptey game Stats object containing four GameEvent lists--one for each period
		var newGameStats = [new GameEvents(), new GameEvents(), new GameEvents(), new GameEvents()];

		// If there is data saved in cookies, use that, otherwise start anew
		$scope.gameEvents = gameData.gameEvents || newGameStats;
	};
	initializeGameEvents();

	/*
	 *	Helper Method which returns true if there are players on the rink ($scope.activePlayers contains players), and false otherwise.
	 *
	 *	@return 		- True if there are players on the rink ($scope.activePlayers contains players), and false otherwise
	 */
	var playersAreActive = function () {
		var status = false;
		for (var player in $scope.activePlayers) {
			if ($scope.players[player]) { status = true; }
		}
		return status;
	};

	/*
	 *	Helper Methid that substitutes all active players off. Used at the end of periods and games.
	 */
	var emptyActivePlayers = function () {
		// Stop the timer
	 	if ($scope.gameTimer.isActive) { $scope.stopTimer(); }
	 	// Record the stop time
	 	gameData.setEndTime($scope.gameTimer.time());
	 	for (var activePlayer in $scope.activePlayers) {
			//Go through each position
			$scope.positionSelection = activePlayer;
			//Swap off the player
			$scope.swapPlayer();
		}
	};

	$scope.execuStack = actionService;
	$scope.undoable = $scope.execuStack.undoable;
	$scope.redoable = $scope.execuStack.redoable;

	var timeOnId = gameData.timeOnId || 0;
	var timeOffId = gameData.timeOffId || 0;
	var zoneStartsId = gameData.zoneStartsId || 0;
	var shotsOnId = gameData.shotsOnId || 0;
	var shotsAgainstId = gameData.shotsAgainstId || 0; 
	var teamGoalsId = gameData.teamGoalsId || 0; 
	var opponentGoalsId = gameData.opponentGoalsId || 0;

	$scope.startTimer = function () {
		if ($scope.setZoneStart() !== undefined) {
			$scope.zoneStart = undefined; 
			$scope.gameTimer.start();
			$scope.gameTimer.isActive = true;
			if (!gameData.getStartTime) { gameData.setStartTime($scope.gameTimer.time()); }
		}
	};

	$scope.stopTimer = function () {
		$scope.gameTimer.stop();
		$scope.gameTimer.isActive = false;
	};

	$scope.toggleTimer = function () {
		if (!$scope.gameTimer.isActive) { $scope.startTimer(); }
		else { $scope.stopTimer(); }
	};
	
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
	 			opponentGoalsId: opponentGoalsId,
	 			zoneStartsId: zoneStartsId
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
	 			zoneStartsId = val.zoneStartsId || 0;
	 		});

	 		if ($scope.period) { 
	 			//TODO: ADD GAME METADATA TO gameDATA
	 			var gameInfo = {
	 				period: $scope.period,
	 				game: 	gameData.game || 0,
	 				opponent: gameData.opponent,
	 				home: gameData.home,
	 				location: gameData.location,
	 				gameEvents: $scope.gameEvents[$scope.period - 1]
	 			};
	 			emptyActivePlayers();
	 			gameAPI.saveGameEvents(gameInfo, function (result) {
	 				$scope.execuStack.push(periodAction);
	 			});
	 		}	// If the period has never been initialized,
	 		else { periodAction.execute(); }								// Initialize it without adding it to the action stack
	 		gameData.update($scope.activePlayers, $scope.period);			// This may cause problems with the callback above
	 	}
	 };

	 $scope.setPeriod(gameData.getPeriod() || 1);	// Initialize the period if it has been saved
	 $scope.zoneStart = 0;

	// Game Event Functions
	/*
	 * Constructor for game event objects that records the game number (ID), period, 
	 * time within a game and the change of an attribute.
	 */
	 var GameEvent = function (eventId, period, activePlayers, time, count) {
	 	this.game = gameData.game;//$scope.gameDetails.gameNumber;
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
	 	// If there are players active:
		if (playersAreActive()) {
		 	var newGameEvent = new GameEvent(shotsOnId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), 1);

			// applier
			// For each active player:
			var applier = function (GameEvent) {
				var activePlayers = [];
				for (var i = 0; i < $scope.activePlayers.length && $scope.activePlayers[i]; i++) { activePlayers.push($scope.activePlayers[i].playerNumber); }
					GameEvent.activePlayers = activePlayers;
				$scope.gameEvents[$scope.period - 1].shotsOn.push(GameEvent);
				shotsOnId++;
			};

			// unApplier
			// For each active player:
			var unApplier = function () {
				$scope.gameEvents[$scope.period - 1].shotsOn.pop();
				shotsOnId--;
			};

			var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

			$scope.execuStack.push(newGameAction);
		}
		else { console.error('You need players on the rink!'); }
	};

	/*
	 *	Function which decrements the Shots On statistic for each player involved in the play (active player).
	 */
	 $scope.subtShotsOn = function () {
	 	// If there are players active:
		if (playersAreActive()) {
		 	var newGameEvent = new GameEvent(shotsOnId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), -1);

			// applier
			// For each active player:
			var applier = function (GameEvent) {
				var activePlayers = [];
				for (var i = 0; i < $scope.activePlayers.length && $scope.activePlayers[i]; i++) { activePlayers.push($scope.activePlayers[i].playerNumber); }
					GameEvent.activePlayers = activePlayers;
				$scope.gameEvents[$scope.period - 1].shotsOn.push(GameEvent);
				shotsOnId++;
			};

			// unApplier
			// For each active player:
			var unApplier = function () {
				$scope.gameEvents[$scope.period - 1].shotsOn.pop();
				shotsOnId--;
			};

			var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

			$scope.execuStack.push(newGameAction);
		}
		else { console.error('You need players on the rink!'); }
	};

	/*
	 *	Function which increments the Shots Against statistic for each player involved in the play (active player).
	 */
	 $scope.addShotsAgainst = function () {
	 	// If there are players active:
		if (playersAreActive()) {
		 	var newGameEvent = new GameEvent(shotsAgainstId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), 1);

			// applier
			// For each active player:
			var applier = function (GameEvent) {
				var activePlayers = [];
				for (var i = 0; i < $scope.activePlayers.length && $scope.activePlayers[i]; i++) { activePlayers.push($scope.activePlayers[i].playerNumber); }
					GameEvent.activePlayers = activePlayers;
				$scope.gameEvents[$scope.period - 1].shotsAgainst.push(GameEvent);
				shotsAgainstId++;
			};

			// unApplier
			// For each active player:
			var unApplier = function () {
				$scope.gameEvents[$scope.period - 1].shotsAgainst.pop();
				shotsAgainstId--;
			};

			var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

			$scope.execuStack.push(newGameAction);
		}
		else { console.error('You need players on the rink!'); }
	};

	/*
	 *	Function which decrements the Shots Against statistic for each player involved in the play (active player).
	 */
	 $scope.subtShotsAgainst = function () {
	 	// If there are players active:
		if (playersAreActive()) {
		 	var newGameEvent = new GameEvent(shotsAgainstId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), -1);

			// applier
			// For each active player:
			var applier = function (GameEvent) {
				var activePlayers = [];
				for (var i = 0; i < $scope.activePlayers.length && $scope.activePlayers[i]; i++) { activePlayers.push($scope.activePlayers[i].playerNumber); }
					GameEvent.activePlayers = activePlayers;
				$scope.gameEvents[$scope.period - 1].shotsAgainst.push(GameEvent);
				shotsAgainstId++;
			};

			// unApplier
			// For each active player:
			var unApplier = function () {
				$scope.gameEvents[$scope.period - 1].shotsAgainst.pop();
				shotsAgainstId--;
			};

			var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

			$scope.execuStack.push(newGameAction);
		}
		else { console.error('You need players on the rink!'); }
	};

	/*
	 *	Function which increments the Team Goal statistic for each player involved in the play (active player).
	 */
	 $scope.addTeamGoal = function () {
	 	// If there are players active:
	 	if (playersAreActive()) {
		 	var newGameEvent = new GameEvent(teamGoalsId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), 1);

			// applier
			// For each active player:
			var applier = function (GameEvent) {
				var activePlayers = [];
				for (var i = 0; i < $scope.activePlayers.length && $scope.activePlayers[i]; i++) { activePlayers.push($scope.activePlayers[i].playerNumber); }
					GameEvent.activePlayers = activePlayers;
				$scope.gameEvents[$scope.period - 1].teamGoals.push(GameEvent);
				teamGoalsId++;
			};

			// unApplier
			// For each active player:
			var unApplier = function () {
				$scope.gameEvents[$scope.period - 1].teamGoals.pop();
				teamGoalsId--;
			};
			
			var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

			$scope.execuStack.push(newGameAction);
		}
		else { console.error('You need players on the rink!'); }
	};

	/*
	 *	Function which increments the Opponent Goal statistic for each player involved in the play (active player).
	 */
	 $scope.addOpponentGoal = function () {
	 	// If there are players active:
	 	if (playersAreActive()) {
		 	var newGameEvent = new GameEvent(opponentGoalsId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), 1);

			// applier
			// For each active player:
			var applier = function (GameEvent) {
				var activePlayers = [];
				for (var i = 0; i < $scope.activePlayers.length && $scope.activePlayers[i]; i++) { activePlayers.push($scope.activePlayers[i].playerNumber); }
					GameEvent.activePlayers = activePlayers;
				$scope.gameEvents[$scope.period - 1].opponentGoals.push(GameEvent);
				opponentGoalsId++;
			};

			// unApplier
			// For each active player:
			var unApplier = function () {
				$scope.gameEvents[$scope.period - 1].opponentGoals.pop();
				opponentGoalsId--;
			};

			var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

			$scope.execuStack.push(newGameAction);
		}
		else { console.error('You need players on the rink!'); }
	};

	/*
	 *	Function which saves the zone start of the active players and then signals the timer to start.
	 *	-2 = strong def, -1 = weak def, 0 = neutral, 1 = weak off, 2 = strong off
	 */
	 $scope.setZoneStart = function () {
	 		// Check to see that there is a zone start and active players
		 	if ($scope.zoneStart !== undefined && playersAreActive()) {
		 		var newGameEvent = new GameEvent(zoneStartsId, $scope.period, $scope.activePlayers, $scope.gameTimer.time(), $scope.zoneStart);

			// applier
			// For each active player:
			var applier = function (GameEvent) {
				var activePlayers = [];
				for (var i = 0; i < $scope.activePlayers.length && $scope.activePlayers[i]; i++) { activePlayers.push($scope.activePlayers[i].playerNumber); }
					GameEvent.activePlayers = activePlayers;
				$scope.gameEvents[$scope.period - 1].zoneStarts.push(GameEvent);
				zoneStartsId++;
			};

			// unApplier
			// For each active player:
			var unApplier = function () {
				$scope.gameEvents[$scope.period - 1].zoneStarts.pop();
				zoneStartsId--;
				if ($scope.gameTimer.isActive) { $scope.stopTimer(); }
			};

			var newGameAction = new Action(undefined, newGameEvent, applier, unApplier);

			$scope.execuStack.push(newGameAction);
			return true;
		}
		// If not, throw the appropriate error messages to inform the user of their mistake
		else if ($scope.zoneStart === undefined) { console.error('You need to select a zone start!'); }
		else { console.error('You need players on the rink!'); }
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

	/*
	 *	Constructor for the SwapEvent object
	 *
	 *	@param game 		- The game ID (game number)
	 *	@param eventId	 	- The unique event ID
	 *	@param player	 	- The player making the swap
	 *	@param time 		- The time of the swap
	 */
	var SwapEvent = function (eventId, player, time) {
		this.game = gameData.game;
		this.eventId = eventId;
		this.period = $scope.period;
		this.player = player;
		this.time = time;
	};

	// Lineup Functions
	/*
	 * Function which sets the hover scope variable to be used with ng-class in 
	 * game-lineup for mouseover effects.
	 */
	 $scope.setHover = function (index) {
	 	$scope.hover = index;
	 };

	/*
	 *	Function which sets the selection scope variable to indicate stylistically 
	 *	which lineup will make the substitution.
	 */
	 $scope.setLineupSelection = function (selection) {
	 	$scope.lineupSelection = selection;
	 };

	 /*
	  *	Constructor for the Lineup object
	  *
	  *	@param oldLineup 	- The current active lineup
	  *	@param newLineup 	- The lineup which will repace the current lineup
	  *	@param time 		- The time of the swap
	  */
	 var LineupSwap = function(oldLineup, newLineup, time) {
	 	this.oldLineup = oldLineup;
	 	this.newLineup = newLineup;
	 	this.time = time;
	 };

	 /*
	  *	Function which swaps the current active lineup with the selected one, 
	  *	recording timeOn and timeOff for the players as necessary
	  *
	  *	@param index 		- The index of the lineup replacing the existing one in $scope.lineups
	  */
	  $scope.swapLineup = function (index) {

	  	var newActivePlayers = [];

	  	newActivePlayers[0] = $scope.lineups[index].leftWing;
	  	newActivePlayers[1] = $scope.lineups[index].center;
	  	newActivePlayers[2] = $scope.lineups[index].rightWing;
	  	newActivePlayers[3] = $scope.lineups[index].defence1;
	  	newActivePlayers[4] = $scope.lineups[index].defence2;

	  	var newLineupSwap = new LineupSwap($scope.activePlayers, newActivePlayers, $scope.gameTimer.time());
	  	var unApplier, timeOn, timeOff;
	  	var applier = function (lineupSwap) {
	  		$scope.activePlayers = lineupSwap.newLineup;
	 		// For each player in the new lineup:
	 		for (var i = 0; i < lineupSwap.newLineup.length; i++) {
	 			// Check to see if the position being filled is empty
	 			if (!lineupSwap.oldLineup[i]) {
	 				// If it is, we only need to record a time in for the player
	 				timeOn = new SwapEvent(timeOnId, lineupSwap.newLineup[i].playerNumber, lineupSwap.time);
	 				timeOnId++;
	 				$scope.gameEvents[$scope.period - 1].timeOn.push(timeOn);
	 			}
	 			// If it is occupied, then, check to see if the player occupying the position is the same player as the one making the switch
	 			else if (lineupSwap.oldLineup[i].playerNumber !== lineupSwap.newLineup[i].playerNumber) {
	 				// If not, then they are different players and the timeOff for the existing and the timeOn for the new needs to be recorded
	 				timeOn = new SwapEvent(timeOnId, lineupSwap.newLineup[i].playerNumber, lineupSwap.time);
	 				timeOff = new SwapEvent(timeOffId, lineupSwap.oldLineup[i].playerNumber, lineupSwap.time);
	 				timeOnId++;
	 				timeOffId++;
	 				$scope.gameEvents[$scope.period - 1].timeOn.push(timeOn);
	 				$scope.gameEvents[$scope.period - 1].timeOff.push(timeOff);
	 			}
	 			// Otherwise, the player is the same player and a timeOn/Off should not be recorded
	 		}
	 	};
	 	// If there are players on the rink, then there will be timeOff data for the players to pop
	 	if (playersAreActive()) {
	 		unApplier = function (lineupSwap) {
	 			$scope.activePlayers = lineupSwap.oldLineup;
	 			lineupSwap.oldLineup.forEach(function (player) { $scope.gameEvents[$scope.period - 1].timeOff.pop(); });
	 			lineupSwap.newLineup.forEach(function (player) { $scope.gameEvents[$scope.period - 1].timeOn.pop(); });
	 			timeOnId--;
	 			timeOffId--;
	 		};
	 	}
	 	// Otherwise, there is no timeOff data, so let's not try to pop it
	 	else {
	 		unApplier = function (lineupSwap) {
	 			$scope.activePlayers = lineupSwap.oldLineup;
	 			lineupSwap.newLineup.forEach(function (player) { $scope.gameEvents[$scope.period - 1].timeOn.pop(); });
	 			timeOnId--;
	 		};
	 	}
	 	$scope.execuStack.push(new Action(newLineupSwap, newLineupSwap, applier, unApplier));
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
	  *	Constructor for the PlayerSwap object
	  *
	  *	@param oldPlayer 	- The current player occupying the position
	  *	@param newPlayer 	- The player which will repace the current player
	  *	@param position 	- The position where the swap is being made
	  *	@param time 		- The time of the swap
	  */
	 var PlayerSwap = function(oldPlayer, newPlayer, position, time) {
	 	this.oldPlayer = oldPlayer;
	 	this.newPlayer = newPlayer;
	 	this.position = position;
	 	this.time = time;
	 };

	 /*
	  *	Function which swaps the current selected position with the selected player.
	  *
	  *	@param index 		- The index of the player who will make the swap
	  */
	 $scope.swapPlayer = function (index) {
	 	var newPlayerSwap, applier, unApplier;
	 	// Check to make sure a position is selected before proceeding
	 	if ($scope.positionSelection === undefined) {
	 		console.error('You must select a position!');
	 	}
	 		
	 	// If a position is selected, but no player, Substitute off a player without substiting one on
	 	else if (index === undefined) {
	 		// Check to see if a player occupies the position
	 		if ($scope.activePlayers[$scope.positionSelection]) {
	 			newPlayerSwap = new PlayerSwap($scope.activePlayers[$scope.positionSelection], undefined, $scope.positionSelection, $scope.gameTimer.time());
	 			applier = function (playerSwap) {
	 				$scope.activePlayers[playerSwap.position] = playerSwap.newPlayer;
	 				var timeOff = new SwapEvent(timeOffId, playerSwap.oldPlayer.playerNumber, playerSwap.time);
	 				timeOffId++;
	 				$scope.gameEvents[$scope.period - 1].timeOff.push(timeOff);
	 			};

	 			unApplier = function (playerSwap) {
	 				$scope.activePlayers[playerSwap.position] = playerSwap.oldPlayer;
	 				$scope.gameEvents[$scope.period - 1].timeOff.pop();
	 				timeOffId--;
	 			};

	 			$scope.execuStack.push(new Action(newPlayerSwap, newPlayerSwap, applier, unApplier));
	 		}
	 		// If not, the position is already unoccupied, so there is no swap being made
	 	}
	 	// Both a position and a player are selected, check to see if we are swapping an unfilled postition:
	 	else if (!$scope.activePlayers[$scope.positionSelection]) {
	 		newPlayerSwap = new PlayerSwap(undefined, $scope.players[index], $scope.positionSelection, $scope.gameTimer.time());
	 		applier = function (playerSwap) {
	 			$scope.activePlayers[playerSwap.position] = playerSwap.newPlayer;
	 			var timeOn = new SwapEvent(timeOnId, playerSwap.newPlayer.playerNumber, playerSwap.time);
	 			timeOnId++;
	 			$scope.gameEvents[$scope.period - 1].timeOn.push(timeOn);
	 		};

	 		unApplier = function (playerSwap) {
	 			$scope.activePlayers[playerSwap.position] = playerSwap.oldPlayer;
	 			$scope.gameEvents[$scope.period - 1].timeOn.pop();
	 			timeOnId--;
	 		};

	 		$scope.execuStack.push(new Action(newPlayerSwap, newPlayerSwap, applier, unApplier));
	 	}
	 	// If both the position and the player are selected, and the position is filled, check to make sure the selections are not the same player (we cannot swap on and off the same player at the same time!)
	 	else if ($scope.players[index].playerNumber !== $scope.activePlayers[$scope.positionSelection].playerNumber) {
	 		newPlayerSwap = new PlayerSwap($scope.activePlayers[$scope.positionSelection], $scope.players[index], $scope.positionSelection, $scope.gameTimer.time());
	 		applier = function (playerSwap) {
	 			$scope.activePlayers[playerSwap.position] = playerSwap.newPlayer;
	 			var timeOn = new SwapEvent(timeOnId, playerSwap.newPlayer.playerNumber, playerSwap.time);
	 			var timeOff = new SwapEvent(timeOffId, playerSwap.oldPlayer.playerNumber, playerSwap.time);
	 			timeOnId++;
	 			timeOffId++;
	 			$scope.gameEvents[$scope.period - 1].timeOn.push(timeOn);
	 			$scope.gameEvents[$scope.period - 1].timeOff.push(timeOff);
	 		};

	 		unApplier = function (playerSwap) {
	 			$scope.activePlayers[playerSwap.position] = playerSwap.oldPlayer;
	 			$scope.gameEvents[$scope.period - 1].timeOn.pop();
	 			$scope.gameEvents[$scope.period - 1].timeOff.pop();
	 			timeOnId--;
	 			timeOffId--;
	 		};

	 		$scope.execuStack.push(new Action(newPlayerSwap, newPlayerSwap, applier, unApplier));
	 	}
	 	// Otherwise, two selections are made and they are the same player, so throw an error message
	 	else { console.error('You cannot swap the same player!'); }
	};



	 /*
	  * Function which returns true if the player is currently active and false otherwise.
	  * 
	  * @param index 		- The index of the player which is currently selected/active
	  * @return 			- Boolean: True if the player is currently active and false otherwise
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

	  /*
	   *	Function that ends the game by saving the current end game state.
	   */
	  $scope.endGame = function () {
	  	// Record timeOff for active players
	  	emptyActivePlayers();
	  	$scope.gameTimer.reset();
	  	// Push data
	  	$scope.setPeriod(4);
	  	//TODO: Have game summary modal come up
	  };

	  //  DEBUGGING  //

	  $scope.showGameData = function () {
	  	console.info($scope.gameEvents);
	  };

	  $scope.showMilliseconds = function () {
	  	console.info($scope.gameTimer.time());
	  };

	}])

.controller('timerController', ['$scope', 'gameTimerFactory', 
	function ($scope, gameTimerFactory) {
		$scope.gameTimer = gameTimerFactory;
	}])

.controller('newGameModalController', ['$scope', '$modalInstance', 'gameAPI',
	function ($scope, $modalInstance, gameAPI) {
		var games = gameAPI.getGameEvents().length;
		$scope.gameNumber = games;
		$scope.team = gameAPI.getUser().team;
		$scope.home = 'Home';
		$scope.opponent = 'Someone';
		$scope.location = 'Somewhere';

		$scope.toggleHome = function () {
			if ($scope.home === 'Home') { $scope.home = 'Away'; }
			else {$scope.home = 'Home'; }
		};

		$scope.inValidGame = function () {
			if ($scope.gameNumber < games && $scope.gameNumber >= 0) { return 1; }
			else if ($scope.gameNumber < 0) { return 2; }
			else { return 0; }
		};

		$scope.validOpponent = function () {
			if ($scope.home) { return true; }
			else { return false; }
		};

		$scope.validLocation = function () {
			if ($scope.home) { return true; }
			else { return false; }
		};

		$scope.showConfirm = function () {
			if (!$scope.inValidGame()) { return true; }
			else { return false; }
		};

		$scope.saveGameData = function (ignore) {
			var newGame = {
				game: Math.ceil($scope.gameNumber), 
				opponent: $scope.opponent, 
				home: $scope.home, 
				location: $scope.location
			};

			$modalInstance.close(newGame);
		};
	}]);
