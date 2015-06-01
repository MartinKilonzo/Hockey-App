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

		$scope.newEmptyLineup = function () {
			var newLineup = {
				name: "New Lineup",
				leftWing: "LW",
				center: "C",
				rightWing: "RW",
				defence1: "D",
				defence2: "D"
			};
			$scope.lineups.push(newLineup);
		};

		/* WIP */
		$scope.rename = function(index) {
			console.log($scope.newTitle);

			if ($scope.newTitle)
			{
				$scope.lineups[index].name = $scope.newTitle;

				console.log($scope.lineups[index].name);
			}

			$scope.newTitle = '';
		};

		console.log('Ended lineupsController');
		$('#success').show();
		$('#warning').hide();

	}])

	.controller('createLineupController', ['$scope', 'players',
		function ($scope, $modalInstance, players) {
		
		// Lineup Creation //

		// Footer Page Handling //
		$scope.pages = ['Right Wing', 'Left Wing', 'Center', 'Defence','Title'];

		$scope.totalItems = $scope.pages.length * 10;
		console.log($scope.totalItems);

		$scope.currentPage = 1;

		$scope.createNew = function () {
			console.log('Create new lineup');
			$modalInstance.close('cancel');
		};

		$scope.setPage = function (index) {
			$scope.currentPage = index;
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
