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

		$scope.$watch('lineups', function () {
 			localStorageService.set('lineups', $scope.lineups);
 		}, true);

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

		var newLinemember;

		$scope.newPlayer = function (event, ui, player) {			
			newLinemember = player;
			console.log(newLinemember);
		};

		$scope.addLeftWing = function (event, ui, lineup) {
			lineup.leftWing = '#' + newLinemember.playerNumber.toString();
			console.log(lineup.leftWing);
			newLinemember = '';
			console.log($scope.lineups);
		};

		$scope.addCenter = function (event, ui, lineup) {
			lineup.center = '#' + newLinemember.playerNumber.toString();
			console.log(lineup.center);
			newLinemember = '';
		};

		$scope.addRightWing = function (event, ui, lineup) {
			lineup.rightWing = '#' + newLinemember.playerNumber.toString();
			console.log(lineup.rightWing);
			newLinemember = '';
		};

		$scope.addDefence1 = function (event, ui, lineup) {
			lineup.defence1 = '#' + newLinemember.playerNumber.toString();
			console.log(lineup.defence1);
			newLinemember = '';
		};

		$scope.addDefence2 = function (event, ui, lineup) {
			lineup.defence2 = '#' + newLinemember.playerNumber.toString();
			console.log(lineup.defence2);
			newLinemember = '';
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
