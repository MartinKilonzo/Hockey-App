'use strict';

angular.module('HockeyApp')

.controller('rosterPageController', function($scope) {

	console.log('Loaded Roster Controller.');

	$scope.pageClass = 'page-roster';
})

.controller('rosterController', ['$scope', 'localStorageService', '$log', '$resource', 
	function ($scope, localStorageService, $log, $resource) {
		
 		// Initialization
 		console.log('Started controller roster');

 		var Player = $resource('http://localhost:8999/api/players/:resourceId', {resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}});

 		var populatePlayers = function () {
 			var savedPlayers = Player.sync( function (result) {
 				$scope.players = result;
 			});
 		};

 		populatePlayers();

 		$scope.$watch('players', function () {
 			localStorageService.set('players', $scope.players);
 		}, true);

 		var tempPlayers = [];

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

 				else {
					postPlayer(newPlayer);
 				}

 				$scope.playerInfo = '';
 				//TODO: Modify alerts to be less intrusive
 			}
 		};

 		var postPlayer = function (player) {
 			var httpPlayer = new Player();
 			httpPlayer.firstName = player.firstName;
 			httpPlayer.lastName = player.lastName;
 			httpPlayer.playerNumber = player.playerNumber;
 			httpPlayer.position = player.position;
 			httpPlayer.games = [];
 			httpPlayer.$save( function (result) {
 				$scope.players.push(result);
 			});
 		};

		$scope.removePlayer = function (player) {
			var index = $scope.players.indexOf(player);
			var removedPlayer = $scope.players[index];
			deletePlayer(index);
		};

		var deletePlayer = function (index) {
			var httpPlayer = new Player({resourceId: $scope.players[index]._id.toString()});
			httpPlayer.$delete( function (result) {
				if (result.$resolved) {
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
