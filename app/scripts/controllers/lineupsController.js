'use strict';

angular.module('HockeyApp')

.controller('lineupsController', ['$scope', 'localStorageService','$modal', 
	function ($scope, localStorageService, $modal, TeamFactory, PlayerFactory) {
		console.log('Started lineupsController');
		$('#warning').show();
		$('#danger').hide();

		$scope.dropToggle = false;

		var savedPlayers = localStorageService.get('players');
		var savedLineups = localStorageService.get('lineups');

		$scope.players = savedPlayers || [];
		$scope.lineups = savedLineups || [];

		$scope.$watch('lineups', function () {
			localStorageService.set('lineups', $scope.lineups);
		}, true);


		// ** CREATE LINEUP FUNCTIONS ** //
		$scope.createNewLineup = function () {

			var modalInstance = $modal.open({

				animation: true,
				templateUrl: 'views/partials/lineup-create.html',
				controller: 'createLineupController',
				size: 'lg',
				resolve: {
					players: function () {
						return $scope.players;
					},
					lineup: function () {
						console.log('editLineupIndex = ' + $scope.editLineupIndex);
						if ($scope.editLineupIndex >= 0) {

							return $scope.lineups[$scope.editLineupIndex];
						}
						else {
							return undefined;
						}
					}
				}
			});

			modalInstance.result.then(function (newLineup) {
				console.log(newLineup);
				saveLineup(newLineup, $scope.editLineupIndex);
				
			}, function () {
				console.log('Modal Closed.');
			})['finally'](function() {
				$scope.modalInstance = undefined;
   				 $scope.editLineupIndex = undefined;  // <--- This fixes
   				});
		};

		$scope.editLineup = function (index) {
			console.log(index);
			$scope.editLineupIndex = index;
			$scope.createNewLineup();
		};

		var saveLineup = function(newLineup, index)
		{
			var newLineup =
			{
				leftWing: newLineup[0],
				center: newLineup[1],
				rightWing: newLineup[2],
				defence1: newLineup[3],
				defence2: newLineup[4],
				lineupTitle: newLineup[5]
			};

			// If an index has been set, then the user is editing a lineup, so be sure to overwrite the existing one
			if (index >= 0) {
				$scope.lineups[index] = newLineup;
			}

			// Otherwise, the user is creating a new lineup, so be sure to save it
			else {
				$scope.lineups.push(newLineup);
			}
			
		};

		console.log('Ended lineupsController');
		$('#success').show();
		$('#warning').hide();

	}])

.controller('createLineupController', ['$scope', '$modalInstance', 'players', 'lineup',
	function ($scope, $modalInstance, players, lineup) {

		// Page Handling //
		$scope.pages = ['Left Wing', 'Center', 'Right Wing', 'Defence','Title'];

		$scope.totalItems = $scope.pages.length * 10;

		$scope.currentPage = 0; // Same as ng-init="currentPage = 0"

		

		/*
		 * Function which validates the lineup, setting a flag which indicates that the lineup is okay to save
		 */
		 $scope.validateLineup = function() {
		 	$scope.validLineup = true;

			// If the new lineup contains fewer than six elements, it contains empty slots, and is therefore invalid
			if ($scope.newLineup.length < 6)
			{
				$scope.validLineup = false;
				return;
			}

			// Check for duplicate entries, which are invalid as a player cannot hold more than one position on ice at a time
			for (var i = 0; i < $scope.newLineup.length; i++) {

				// NULL check for safety
				if ($scope.newLineup[i]) {

					// Check for duplicity
					var uniquePlayer = $scope.newLineup[i];

					// Scans the remaining entries for a duplicate, if one exists then the new lineup is invalid
					for (var j = i + 1; j < $scope.newLineup.length - 1; j++)
					{
						if ($scope.newLineup[j] === uniquePlayer) {
							$scope.validLineup = false;
							return;
						}
					}
				}

				// If the entry is a NULL entry, then the lineup is invalid
				else {
					$scope.validLineup = false;
					return;
				}
			}
		};

		/*
		 * Function which saves the new lineup and passes the changes to the linuep page
		 */
		 $scope.saveNew = function () {
		 	console.log('Create new lineup');
		 	$modalInstance.close($scope.newLineup, editingFlag);
		 };

		/*
		 * Function which handles page navigation within the modal
		 */
		 $scope.setPage = function (index) {
		 	$scope.currentPage = index;

			// Flag which indicates whether or not to treat the page as a Defence page or another page
			// (The defence page is treated as two pages in one, unlike the rest)
			if (index === 3) {
				$scope.defenceSelected = 1;
			}

			else {
				$scope.defenceSelected = 0;
			}

			$scope.selectionMade = $scope.newLineup[index];
		};

		// Lineup Creation //
		$scope.players = players;
		$scope.newLineup = [];
		var editingFlag = false;

		if (lineup) {	
			$scope.newLineup[0] = lineup.leftWing;
			$scope.newLineup[1] = lineup.center;
			$scope.newLineup[2] = lineup.rightWing;
			$scope.newLineup[3] = lineup.defence1;
			$scope.newLineup[4] = lineup.defence2;
			$scope.newLineup[5] = lineup.lineupTitle;
			console.log($scope.newLineup[0]);
			editingFlag = true;
		}

		/*var newLineup = {
			leftWing: "LW",
			center: "C",
			rightWing: "RW",
			defence1: "D",
			defence2: "D"
			lineupTitle: "New Lineup",
		};*/

		/* 
		 * Function which handles the page-to-lineup-array-index conversion; 
		 * Converts the page number and appropriate selections to the appropriate index
		 */
		 var setPosition = function ()
		 {
		 	if ($scope.currentPage === 3)
		 	{
		 		if ($scope.defenceSelected === 1) {
		 			return $scope.currentPage;
		 		}

		 		else {
		 			return $scope.currentPage + 1;
		 		}
		 	}

		 	else {
		 		return $scope.currentPage;
		 	}
		 };

		 /* 
		 * Fucntion which confirms the lineup validty at each page
		 */
		 $scope.playerSelection = function(player) {
		 	$scope.selectionMade = player;

		 	var position = setPosition();

		 	$scope.newLineup[position] = player;
		 	$scope.validateLineup();
		 	console.log(player);
		 };

		/*
		 * Function which sets the appropriate defence selection for adding defencemen to the lineup
		 */
		 $scope.setDefenceSelection = function(mode) {
		 	if (mode === 1 && $scope.currentPage === 3) {
		 		$scope.defenceSelected = 1;
		 	}

		 	if (mode === 2 && $scope.currentPage === 3) {
		 		$scope.defenceSelected = 2;
		 	}
		 };

		/*
		 * Function which saves the new title for the new lineup
		 */
		 $scope.setTitle = function() {
			$scope.newLineup[$scope.currentPage + 1] = $scope.newTitle; //Title is stored after both defence
			$scope.validateLineup();
			// RUN CHECK FOR VALIDITY AND SET VALID FLAG
		};
	}]);

		// list of linups
		// Display all the players on the left in a bar
		// Create a new lineup: LW-C-RW-D-D
		// Allow the user to drag and drop players onto linups (without removing them from the panel)
		// Allow the user to delete linups
		// Allow the user to "drag and toss" players in existing lineups (delete)
		// Allow the user to rearrange players within the linups (swapping them)
		// Allow the user to replace players with players outside the lineup
		// Allow the user to rearrange players between the linups (swapping them)
