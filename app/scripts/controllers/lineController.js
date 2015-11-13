'use strict';

angular.module('HockeyApp')

.controller('linesController', ['$log', '$scope','$modal', 'gameAPI',
	function ($log, $scope, $modal, gameAPI) {
		console.log('Started linesController');

		 /** HELPER FUNCTIONS **/

		/*
		 * 	TODO: Check for redundency considering the linuep API and how it handles parsing of lines
		 *	Validation of the existing line by checking the players.
		 * 
		 * 	@return 			- Returns true if the lineup is valid, false if the lineup is invalid
		 */
		var validateLines = function () {
			// Create the buckets (in bucket sort) for easy testing
			var tempPlayers = gameAPI.bucket();

			for (var line in $scope.lines) {
				line = $scope.lines[line];
				for (var player in line) {
					player = line[player];
					if (!tempPlayers[player.playerNumber]) { line.playerStatus = false; }
					else { line.playerStatus = true; }
				}
			}
		};

		/*
		 *	Helper function which returns the index of a line in the line array.
		 *
		 * @params index 		- The line for which to find the index
		 * @return 				- The index of the line or -1 if the line does not exist
		 */
		var indexOfLine = function (line) {
			for (var i = 0; i < $scope.lines[lineTypes[line.lineType]].length; i++) {
				if ($scope.lines[lineTypes[line.lineType]][i]._id === line._id)	{ return i; }
			}
			return -1;
		};

		/** INITIALIZATION **/
		$scope.dropToggle = false;

		var lineTypes = ['offence', 'defence'];

		/* Initialization of players and lines from database. */
		gameAPI.getPlayers( function (result) {
		 	$scope.players = result;

		 	gameAPI.getLines( function (result) {
		 		$scope.lines = result;
		 		validateLines();
		 	});
		});

		/*
		 *	Function for line tools' mouseover
		 */
		$scope.setHover = function (index) {
		 	$scope.showLineTools = index;
		 };


		// ** CREATE LINEUP FUNCTIONS ** //
		$scope.createNewLine = function (line) {

			var modalInstance = $modal.open({

				animation: true,
				templateUrl: 'views/partials/line/line-create.html',
				controller: 'createLineController',
				size: 'lg',
				resolve: {
					players: function () {
						return $scope.players;
					},
					line: function () {
						if (line) {
							return line;
						}
						else {
							return undefined;
						}
					}
				}
			});

			modalInstance.result.then( function (newLine) {
				saveLine($scope.editLineIndex, newLine);
				
			}, function () {
				console.log('Modal Closed.');
			})['finally'](function() {
				modalInstance = undefined;
   				$scope.editLineIndex = undefined;  // <--- This fixes
   				});
		};

		$scope.editLine = function (index, line) {
			$scope.editLineIndex = index;
			$scope.createNewLine(line);
		};

		var saveLine = function(index, newLine) {
			// If an index has been set (ie. not undefined), then the user is editing a line, so be sure to overwrite the existing one
			if (index >= 0) {
				gameAPI.modifyLine(index, newLine, function (result) {
					if (result) { $scope.lines[lineTypes[newLine.lineType]][index] = result; }
				});	
			}

			// Otherwise, the user is creating a new line, so be sure to save it
			else {
				gameAPI.saveLine(newLine, function (result) {
					$scope.lines[lineTypes[newLine.lineType]].push(result);
				});
			}
			
		};

		$scope.removeLine = function (line) {
			gameAPI.deleteLine(line, function (result) {
				var index = indexOfLine(result);
				if (index >= 0) { 
					$scope.lines[lineTypes[line.lineType]].splice(index, 1); 
				}
			});
		};

		console.log('Ended linesController');
	}])

.controller('createLineController', ['$scope', '$modalInstance', 'players', 'line',
	function ($scope, $modalInstance, players, line) {

		/* 
		 *	Helper function which handles the page-to-line-array-index conversion; 
		 *	Converts the page number and appropriate selections to the appropriate index
		 */
		 var setPosition = function ()
		 {
		 	return $scope.currentPage;
		 };

		/*
		 *	Helper function which assesses the filled state of the line.
		 *
		 *	@return 			- Returns true if the line is full, false otherwise
		 */
		 var lineIsFull = function () {
		 	if ($scope.mode !== -1 && ($scope.newLine.length === $scope.pages.length || $scope.pages[$scope.pages.length - 1] === 'Title')) {
		 		for (var player in $scope.newLine) {
		 			if (!$scope.newLine[player]) { return false; }
		 		}
		 		return true;
		 	}
		 	else { return false; }
		 };

		/*
		 *	Function which validates the line, setting a flag which indicates that the line is okay to save.
		 *
		 *	@return 			- Returns true if the line is full of non-duplicate players and has a title, false otherwise
		 */
		var validateLines = function () {
		 	// If the line is full and is titled
		 	if ($scope.fullLine && $scope.newTitle !== undefined) {
			 	// Check for duplicate entries, which are invalid as a player cannot hold more than one position on ice at a time
				// For: each player in the line
				for (var player in $scope.newLine) {
					// Scans the array of entries for a duplicate, if one exists then the new line is invalid
					// For: each other player in the line
					for (var currentPlayer in $scope.newLine) {
						if (player !== currentPlayer && $scope.newLine[player].playerNumber === $scope.newLine[currentPlayer].playerNumber) { 
							return false;
						}
					}
				}
				return true;
			}
			return false;
		};

		/*
		 *	Function which handles the functionality behind the title page displying.
		 *
		 *	@return 	 		- The page to switch to
		 */
		 $scope.lastPage = function () {
		 	if ($scope.fullLine && $scope.pages[$scope.pages.length - 1] !== 'Title') { $scope.pages.push('Title'); }
		 	if ($scope.pages[$scope.currentPage] === 'Title') { return true; }
		 	else { return false; }
		 };

		/*
		 *	Function which allows the user to select the type of lineup to be created.
		 *
		 *	@param mode 		- The type of lineup: -1 = menu; 0 = offence; 1 defence
		 */
		 $scope.setMode = function (mode) {
		 	$scope.mode = mode;
		 	if (mode === 0) { $scope.pages = offencePages; }
		 	else if (mode === 1) { $scope.pages = defencePages; }
		 	$scope.lineIsFull();
		 };

		/*
		 *	Function which handles page navigation within the modal.
		 *
		 *	@param index 		- The page to switch to
		 */
		 $scope.setPage = function (index) {
		 	$scope.currentPage = index;

			// Flag which indicates whether or not to treat the page as a Defence page or another page
			// (The defence page is treated as two pages in one, unlike the rest)

			$scope.selectionMade = $scope.newLine[index];
		};

		/*
		 *	Function which swaps the player into the position in the line
		 *
		 *	@param player 		- The player to switch in
		 */
		 $scope.playerSelection = function (player) {
		 	$scope.selectionMade = player;		// The selected position
		 	var position = setPosition();
		 	$scope.newLine[position] = player;
		 	$scope.lineIsFull();
		 	$scope.validateLine();
		 };

		/*
		 *	TODO: CUT THIS FUNCTION
		 *	Function which saves the new title for the new line.
		 */
		 $scope.setTitle = function() {
			$scope.validateLine();
			// RUN CHECK FOR VALIDITY AND SET VALID FLAG
		};

		/*
		 *	TODO: CUT THIS FUNCTION
		 *	Function sets the fullLine flag to true if the line is full and false otherwise.
		 */
		$scope.lineIsFull = function () {
			$scope.fullLine = lineIsFull();
		};

		/*
		 * Function which sets the valid line flag to true if the line is valid and false otherwise.
		 */
		 $scope.validateLine = function () {
		 	$scope.validLine = validateLines();
		};

		/*
		 *	Function which saves the new line and passes the changes to the linuep page.
		 */
		 $scope.saveNew = function () {
		 	$scope.newLine[$scope.pages.length - 1] = $scope.newTitle;
		 	$scope.newLine.pop(); // Pop off the undefined placeholder element
		 	$scope.newLine = {
		 		lineTitle: $scope.newTitle,
		 		lineType: $scope.mode,
		 		players: $scope.newLine
		 	};
		 	$modalInstance.close($scope.newLine);
		 };

 		// Page Handling //
 		$scope.pages = ['Menu'];
 		var offencePages = ['Left Wing', 'Center', 'Right Wing'];
 		var defencePages = ['Left Def.', 'Right Def.'];

 		$scope.totalItems = $scope.pages.length * 10;

		$scope.currentPage = 0; // Same as ng-init="currentPage = 0"

		$scope.players = players;
		$scope.newLine = [];

		// If editing, pass along the existing data
		if (line) {
			//for (var player in line) { $scope.newLine.push(line.players[player]); }
			for (var player in line.players) { $scope.newLine.push(line.players[player]); }
			$scope.newTitle = line.lineTitle;
			$scope.setMode(line.lineType);
			$scope.lineIsFull();
			$scope.validateLine();
		}
		else { $scope.setMode(-1); }
	}]);
