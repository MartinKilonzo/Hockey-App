'use strict';

angular.module('HockeyApp')

	.factory('gameAPI', ['$resource', '$log', function ($resource, $log) {
		// var GameData = $resource('http://localhost:8999/api/user');		// This is what it should be

		var UserAPI = $resource('http://localhost:8999/api/players/:resourceId', {resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}});
		var Player = $resource('http://localhost:8999/api/players/:resourceId', {resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}});

		var Players;
		UserAPI.sync( function (result) {
			Players = result;
			$log.info('Players:', Players);
		});

		var addPlayer = function (player, callback) {
			var httpPlayer = new Player();
 			httpPlayer.firstName = player.firstName;
 			httpPlayer.lastName = player.lastName;
 			httpPlayer.playerNumber = player.playerNumber;
 			httpPlayer.position = player.position;
 			httpPlayer.games = [];
 			httpPlayer.$save( function (result) {
 				if (result) { $log.debug('Added:', result); } 
 				if (callback) { callback(result); }
 				else { return result; }
 			});
		};

		var removePlayer = function (player, callback) {
			var httpPlayer = new Player({ resourceId: player._id });
			httpPlayer.$delete( function (result) {
				if (result) { $log.debug('Removed:', result); }
				if (callback) { callback(result); }
 				else { return result; }		// For some reason the else statement fires of undefined, so use a callback
			});
		};

		return {
			getPlayers: function () {
				return Players;
			},
			savePlayer: addPlayer,
			deletePlayer: removePlayer
		};
	}]);
