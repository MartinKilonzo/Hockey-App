'use strict';

angular.module('HockeyApp')

.controller('rosterPageController', function($scope) {

	console.log("Loaded Roster Controller.");

	$scope.pageClass = 'page-roster';
})

.controller('rosterController', ['$scope', 'localStorageService',
	function ($scope, localStorageService, TeamFactory, PlayerFactory) {
		
 		// Initialization
 		console.log('Started controller roster');
 		$('#warning').show();
 		$('#danger').hide();

 		var savedPlayers = localStorageService.get('players');

 		$scope.players = savedPlayers || [];

 		$scope.$watch('players', function () {
 			localStorageService.set('players', $scope.players);
 		}, true);

 		// Method to add new players
 		$scope.addPlayer = function() {
 			if ($scope.playerInfo) {
 				//TODO: NEED TO ESCAPE SEQUENCE
 				var info = $scope.playerInfo.replace(/, /g, '/').replace(/,/g, '/').split('/');

 				var validPlayer = true;

 				for (var i = 3; i >= 0; i--) {
 					if(!info[i]) {
 						validPlayer = false;
 					}
 				}

 				var newPlayer = {
 					firstName:      info[0],
 					lastName:       info[1],
 					playerNumber:   parseInt(info[2]),
 					position:       info[3],
 				};

 				var playerExists = false;

 				for (var i = $scope.players.length - 1; i >= 0; i--) {
 					if ($scope.players[i].lastName === newPlayer.lastName && $scope.players[i].firstName === newPlayer.firstName) {
 						playerExists = true;
 					}
 				}

 				if (!validPlayer || playerExists) {
 					!validPlayer ? alert("Invalid Entry.") : alert("The player already exists on the roster.");
 				} 

 				else {
 					$scope.players.push(newPlayer);
 					var addedMessage = 'Added ' + newPlayer.firstName + ' ' + newPlayer.lastName;
 					console.log(addedMessage);
 				}

 				$scope.playerInfo = '';
 				//TODO: Order by playerNumber on insert
 				//TODO: Modify alerts to be less intrusive
 			}
 		};

		$scope.removePlayer = function (index) {
			var removedPlayer = $scope.players[index];
			var removedMessage = 'Removed ' + removedPlayer.firstName + ' ' + removedPlayer.lastName;
			
			$scope.players.splice(index, 1);
			
			console.log(removedMessage);
 			/*for (var i = $scope.players.length - 1; i >= 0; i--) {
				if ($scope.players[i].lastName === lastName && $scope.players[i].firstName === firstName) {
					playerExists = true;
				}
			};*/
		};

		$scope.getInfo = function (index) {
			var player = $scope.players[index];
			return "#" + player.playerNumber + " " + player.firstName.charAt(0) + "." + player.lastName + ": " + player.position;
		};

		console.log('Ended controller roster');
		$('#success').show();
		$('#warning').hide();

		/* Ensure that the players can be ordered by number
		angular.forEach($scope.players, function (player) {
			player.playerNumber = parseFloat(player.playerNumber);
			console.log(player.playerNumber);
		});*/

	}]);

//TODO Figure out how to redefine the controller like in the Ang. Tut.
//Martin, Kilonzo, 88, Defense
