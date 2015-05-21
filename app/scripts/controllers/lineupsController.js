'use strict';

angular.module('HockeyApp')

.controller('lineupsController', ['$scope', 'localStorageService',
	function ($scope, localStorageService, TeamFactory, PlayerFactory) {
		console.log('Started lineupsController');
		$('#warning').show();
 		$('#danger').hide();

		var savedPlayers = localStorageService.get('players');
		var savedLineups = localStorageService.get('lineups');

		$scope.players = savedPlayers || [];
		$scope.lineups = savedLineups || [];

		

		$scope.newEmptyLineup = function () {;
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

		// list of linups

		// Display all the players on the left in a bar
		// Create a new lineup: LW-C-RW-D-D
		// Allow the user to drag and drop players onto linups (without removing them from the panel)
		// Allow the user to delete linups
		// Allow the user to "drag and toss" players in existing lineups (delete)
		// Allow the user to rearrange players within the linups (swapping them)
		// Allow the user to replace players with players outside the lineup
		// Allow the user to rearrange players between the linups (swapping them)

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

	}]);
