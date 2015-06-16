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

		$scope.createNewLineup = function () {

			var modalInstance = $modal.open({

				animation: true,
				templateUrl: 'views/partials/lineup-create.html',
				controller: 'createLineupController',
				size: 'lg',
				resolve: {
					players: function () {
						return $scope.players;
					}
				}
			});

			modalInstance.result.then(function (value) {
				console.log(value);
				//the assignment of the new lineup ie pushing it into lineups
			}, function () {
				console.log('Modal Closed.');
			})['finally'](function() {
   				 $scope.modalInstance = undefined  // <--- This fixes
			});
		};

		console.log('Ended lineupsController');
		$('#success').show();
		$('#warning').hide();

	}])

	.controller('createLineupController', ['$scope', '$modalInstance', 'players',
		function ($scope, $modalInstance, players) {

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
			$modalInstance.close($scope.newLineup);
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
		/*var newLineup = {
			leftWing: "LW",
			center: "C",
			rightWing: "RW",
			defence1: "D",
			defence2: "D"
			name: "New Lineup",
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
