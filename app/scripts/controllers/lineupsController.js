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
		$scope.lastPage = $scope.currentPage === $scope.pages.length - 1;

		$scope.totalItems = $scope.pages.length * 10;

		$scope.currentPage = 0;

		 $scope.validateLineup = function() {
			$scope.validLineup = true;

			if ($scope.newLineup.length < 6)
			{
				$scope.validLineup = false;
				return;
			}

			for (var i = 0; i < $scope.newLineup.length; i++) {
				// NULL check
				if ($scope.newLineup[i]) {
					// Check for duplicity
					var uniquePlayer = $scope.newLineup[i];

					for (var j = i + 1; j < $scope.newLineup.length - 1; j++)
					{
						if ($scope.newLineup[j] === uniquePlayer) {
							$scope.validLineup = false;
							return;
						}
					}
				}

				else {
					$scope.validLineup = false;
					return;
				}
			}
		};

		$scope.saveNew = function () {
			console.log('Create new lineup');
			$modalInstance.close($scope.newLineup);
		};

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
			$scope.lastPage = $scope.currentPage === $scope.pages.length - 1;
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

		 // Confirm the lineup validty at each page
		$scope.playerSelection = function(player) {
			$scope.selectionMade = player;

			var position = setPosition();

			$scope.newLineup[position] = player;
			$scope.validateLineup();
			console.log(player);
		};

		$scope.setDefenceSelection = function(mode) {
			if (mode === 1 && $scope.currentPage === 3) {
				$scope.defenceSelected = 1;
			}

			if (mode === 2 && $scope.currentPage === 3) {
				$scope.defenceSelected = 2;
			}
		};

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
