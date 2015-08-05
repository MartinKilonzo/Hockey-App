'use strict';

angular.module('HockeyApp')

	.factory('gameAPI', ['$resource', '$log', function ($resource, $log) {
		// var GameData = $resource('http://localhost:8999/api/user');		// This is what it should be

		var UserAPI = $resource('http://localhost:8999/api/players/:resourceId', {resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}});
		var Player = $resource('http://localhost:8999/api/players/:resourceId', {resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}});
		var Lineup = $resource('http://localhost:8999/api/lineups/:resourceId', {resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}, change: {method: 'PUT'}});

		var Players, Lineups;
		var playerBucket = [];

		var sync = function () {
			Player.sync( function (result) {
				Players = result;
				$log.info('Players:', Players);
			});

			Lineup.sync( function (result) {
				Lineups = result;
				$log.info('Lineups:', Lineups);
			});
		};

		var populatePlayerBucket = function () {
			for (var i = 0; i < Players.length; i++) {
				playerBucket[Players[i].playerNumber] = Players[i];
			}
		};

		var getPlayers = function (callback) {
			if (Players) {
				if (callback) { callback(Players); }
				else { return Players; }
			}
			else {
				Player.sync( function (result) {
					Players = result;
					populatePlayerBucket();
					if (result) { $log.info('Players:', Players); }
					if (callback) { callback(result); }
					else { return result; }
				});
			}
		};

		var addPlayer = function (player, callback) {
			var httpPlayer = new Player();
 			httpPlayer.firstName = player.firstName;
 			httpPlayer.lastName = player.lastName;
 			httpPlayer.playerNumber = player.playerNumber;
 			httpPlayer.position = player.position;
 			httpPlayer.games = [];
 			httpPlayer.$save( function (result) {
 				if (result) { $log.info('Added:', result); } 
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

		var parseLineup = function (lineup) {
			if (lineup) {
				lineup.lineupTitle		=		lineup.lineupTitle;
				lineup.leftWing			=		playerBucket[lineup.leftWing];
				lineup.center			=		playerBucket[lineup.center];
				lineup.rightWing		=		playerBucket[lineup.rightWing];
				lineup.defence1			=		playerBucket[lineup.defence1];
				lineup.defence2			=		playerBucket[lineup.defence2];
			}
			return lineup;
		};

		var getLineups = function (callback) {
			if (Lineups) {
				if (callback) { callback(Lineups); }
				else { return Lineups; }
			}
			else {
				Lineup.sync( function (result) {
					Lineups = result;
					for(var i = 0; i < Lineups.length; i++) { Lineups[i] = parseLineup(Lineups[i]); }
					if (result) { $log.info('Lineups:', Lineups); }
					if (callback) { callback(Lineups); }
					else { return Lineups; }
				});
			}
		};

		var addLineup = function (lineup, callback) {
			$log.debug(lineup);
			var httpLineup = new Lineup();
			httpLineup.leftWing		=	lineup.leftWing.playerNumber;
			httpLineup.center		=	lineup.center.playerNumber;
			httpLineup.rightWing	=	lineup.rightWing.playerNumber;
			httpLineup.defence1		=	lineup.defence1.playerNumber;
			httpLineup.defence2		=	lineup.defence2.playerNumber;
			httpLineup.lineupTitle  =	lineup.lineupTitle;
			$log.debug('httpLineup:', httpLineup);
			httpLineup.$save( function (result) {
				result = parseLineup(result);
				if (result) { $log.info('Added:', result); } 
				if (callback) { callback(result); } 
				else { return result; }
			});
		};

		var changeLineup = function (oldLineup, newLineup, callback) {
			var httpLineup = new Lineup();
			httpLineup.oldLineup	=	oldLineup._id;
			httpLineup.leftWing		=	newLineup.leftWing.playerNumber;
			httpLineup.center		=	newLineup.center.playerNumber;
			httpLineup.rightWing	=	newLineup.rightWing.playerNumber;
			httpLineup.defence1		=	newLineup.defence1.playerNumber;
			httpLineup.defence2		=	newLineup.defence2.playerNumber;
			httpLineup.lineupTitle	=	newLineup.lineupTitle;
			httpLineup.$change( function (result) {
				result = parseLineup(result);
				if (result) { $log.info('Changed:', result); } 
				if (callback) { callback(result); } 
				else { return result; }
			});
		};

		var removeLineup = function (lineup, callback) {
			var httpLineup = new Lineup({ resourceId: lineup._id });
			httpLineup.$delete( function (result) {
				if (result) { $log.info('Removed:', result); }
				if (callback) { callback(result); }
				else { return result; }
			});
		};

		return {
			getPlayers: getPlayers,
			getLineups: getLineups,
			savePlayer: addPlayer,
			deletePlayer: removePlayer,
			saveLineup: addLineup,
			modifyLineup: changeLineup,
			deleteLineup: removeLineup,
			playerBucket: playerBucket
		};
	}]);
