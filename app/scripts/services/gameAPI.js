'use strict';

angular.module('HockeyApp')

.factory('gameAPI', ['$resource', '$log', function ($resource, $log) {
		// var UserData = $resource('http://localhost:8999/api/user');		// This is what it should be

		var User = $resource('http://localhost:8999/api/users/:userId/:resourceId', {userId: '@userId', resourceId: '@resourceId'}, {fetch: {method: 'GET'}});
		var Player = $resource('http://localhost:8999/api/players/:userId/:resourceId', {userId: '@userId', resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}});
		var Lineup = $resource('http://localhost:8999/api/lineups/:userId/:resourceId', {userId: '@userId', resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}, change: {method: 'PUT'}});

		var playerBucket = [];
		var UserData = {
			_id: undefined,
			players: undefined, 
			lineups: undefined
		};

		//** HELPER METHODS **//
		var populatePlayerBucket = function (players) {
			for (var i = 0; i < players.length; i++) {
				playerBucket[players[i].playerNumber] = players[i];
			}
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

		//** USER METHODS **//
		var getUser = function (user, callback) {
			if (UserData._id) {
				if (callback) { callback(UserData); }
				else { return UserData; }
			}
			else {
				var httpUser = new User({ userId: user.team });
				console.info('http', httpUser);
				httpUser.$fetch( function (result) {
					if (result) { 	
						populatePlayerBucket(result.players);
						for(var i = 0; i < result.lineups.length; i++) { result.lineups[i] = parseLineup(result.lineups[i]); }
							UserData = result;
						console.info('UserData:', UserData); 
					} 
					if (callback) { callback(result); }
					else { return result; }
				});
			}
		};

		var setUser = function (user, callback) {
			var httpUser = new User();
			httpUser.firstName = user.firstName;
			httpUser.lastName = user.lastName;
			httpUser.team = user.team;
			httpUser.$save( function (result) {
				if (result) { console.info('Added:', result); } 
				if (callback) { callback(result); }
				else { return result; }
			});
		};

		var modifyUser = function () {

		};

		var removeUser = function () {

		};

		//** PLAYER METHODS **//
		var getPlayers = function (callback) {
			if (UserData.players) {
				console.info('UserData.players:\t', UserData.players);
				if (callback) { callback(UserData.players); }
				else { return UserData.players; }
			}
			else { console.error('Players not found!', UserData); }
		};

		var addPlayer = function (player, callback) {
			var httpPlayer = new Player();
			httpPlayer.user 		= 		UserData._id;
			httpPlayer.firstName 	= 		player.firstName;
			httpPlayer.lastName 	= 		player.lastName;
			httpPlayer.playerNumber = 		player.playerNumber;
			httpPlayer.position 	= 		player.position;
			httpPlayer.games 		= 		[];
			httpPlayer.$save( function (result) {
				if (result) { 
					result = result.players[result.players.length - 1];
					console.info('Added:', result);
					if (callback) { callback(result); }
					else { return result; }
				} 
			});
		};

		var removePlayer = function (player, callback) {
			var httpPlayer = new Player({ 	
				userId: 	UserData._id,
				resourceId: player._id 
			});
			httpPlayer.$delete( function (result) {
				if (result) { console.info('Removed', player._id, 'from:', result); }
				if (callback) { callback(player._id); }
				else { return player._id; }		// For some reason the else statement fires of undefined, so use a callback
			});
		};

		//** LINEUP METHODS **//
		var getLineups = function (callback) {
			if (UserData.lineups) {
				console.info('UserData.lineups:', UserData.lineups);
				if (callback) { callback(UserData.lineups); }
				else { return UserData.lineups; }
			}
			else { console.error('Lineups not found!', UserData); }
		};

		var addLineup = function (lineup, callback) {
			var httpLineup = new Lineup();
			httpLineup.user 		= 	UserData._id;
			httpLineup.leftWing		=	lineup.leftWing.playerNumber;
			httpLineup.center		=	lineup.center.playerNumber;
			httpLineup.rightWing	=	lineup.rightWing.playerNumber;
			httpLineup.defence1		=	lineup.defence1.playerNumber;
			httpLineup.defence2		=	lineup.defence2.playerNumber;
			httpLineup.lineupTitle  =	lineup.lineupTitle;
			console.info('httpLineup:', httpLineup);
			httpLineup.$save( function (result) {
				if (result) { 
					result = parseLineup(result.lineups[result.lineups.length - 1]);
					console.info('Added:', result);
					if (callback) { callback(lineup._id); }
					else { return lineup._id; }
				} 
			});
		};

		var modifyLineup = function (oldLineup, newLineup, callback) {
			var httpLineup = new Lineup();
			httpLineup.user 		= 	UserData._id;
			httpLineup.oldLineup	=	oldLineup._id;
			httpLineup.leftWing		=	newLineup.leftWing.playerNumber;
			httpLineup.center		=	newLineup.center.playerNumber;
			httpLineup.rightWing	=	newLineup.rightWing.playerNumber;
			httpLineup.defence1		=	newLineup.defence1.playerNumber;
			httpLineup.defence2		=	newLineup.defence2.playerNumber;
			httpLineup.lineupTitle	=	newLineup.lineupTitle;
			$log.debug('httpLineup:', httpLineup);
			httpLineup.$change( function (result) {
				if (result) { 
					console.info('Changed:', result.lineups);
					if (callback) { callback(result); }
					else { return result; }
				} 
			});
		};

		var removeLineup = function (lineup, callback) {
			var httpLineup = new Lineup({ 	userId: 	UserData._id,
				resourceId: lineup._id });
			httpLineup.$delete( function (result) {
				if (result) { console.info('Removed:', result); }
				if (callback) { callback(lineup._id); }
				else { return lineup._id; }
			});
		};

		return {
			user: function () {
				return UserData._id;
			},
			players: function () {
				return UserData.players;
			},
			lineups: function () {
				return UserData.lineups;
			},
			bucket: function () {
				return playerBucket;
			},
			getUser: getUser,
			getPlayers: getPlayers,
			getLineups: getLineups,
			setUser: setUser,
			savePlayer: addPlayer,
			saveLineup: addLineup,
			modifyUser: modifyUser,
			modifyLineup: modifyLineup,
			removeUser: removeUser,
			deletePlayer: removePlayer,
			deleteLineup: removeLineup,
			parseLineup: parseLineup
		};
	}]);
