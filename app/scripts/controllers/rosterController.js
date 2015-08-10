'use strict';

angular.module('HockeyApp')

.controller('rosterPageController', function($scope) {

	console.log('Loaded Roster Controller.');

	$scope.pageClass = 'page-roster';
})

.controller('rosterController', ['$scope', 'gameAPI', 'localStorageService', 
	function ($scope, gameAPI, localStorageService) {
		
 		console.log('Started controller roster');
 		
 		/** INITIALIZATION **/
 		gameAPI.getPlayers( function (result) {
 			$scope.players = result;
 		});

		// $scope.$watch('players', function () {
		// 	localStorageService.set('players', $scope.players);
		// }, true);
	
		/** HELPER METHODS **/
		/*
		 *	Method which returns the index of a player in the player array. 
		 *	If none exists, it returns -1.
		 */
		var indexOfPlayer = function (player) {
			for (var i = 0; i < $scope.players.length; i++) {
				if ($scope.players[i]._id === player._id) { return i; }
			}
			return -1;
		};

		/** SCOPE METHODS **/

 		// Method to add new players
 		// TODO: ADD player number validation (UNIQUE AND < 100)
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
 					games: 			[]
 				};

 				var playerExists = false;

 				for (i = $scope.players.length - 1; i >= 0; i--) {
 					if ($scope.players[i].lastName === newPlayer.lastName && $scope.players[i].firstName === newPlayer.firstName) {
 						playerExists = true;
 					}
 				}

 				if (!validPlayer || playerExists) {
 					!validPlayer ? alert('Invalid Entry.') : alert('The player already exists on the roster.');
 				} 

 				else  {
 					gameAPI.savePlayer(newPlayer, function (result) {
 						$scope.players.push(result);
 						$scope.playerInfo = '';
 					});
 				}

 				//TODO: Modify alerts to be less intrusive
 			}
 		};

 		$scope.removePlayer = function (player) {
 			gameAPI.deletePlayer(player, function (result) {
 				var index = indexOfPlayer({_id: result});

 				if (index >= 0) {
 					var removedPlayer = $scope.players[index];
 					$scope.players.splice(index, 1);
 				}
 			});
 		};

 		$scope.getInfo = function (index) {
 			var player = $scope.players[index];
 			return '#' + player.playerNumber + ' ' + player.firstName.charAt(0) + '.' + player.lastName + ': ' + player.position;
 		};

 		console.log('Ended controller roster');

		/* Ensure that the players can be ordered by number
		angular.forEach($scope.players, function (player) {
			player.playerNumber = parseFloat(player.playerNumber);
			console.log(player.playerNumber);
		});*/

}]);

//TODO Figure out how to redefine the controller like in the Ang. Tut.
//Martin, Kilonzo, 88, Defense
