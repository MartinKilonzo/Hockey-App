'use strict';

angular.module('HockeyApp')

.factory('gameAPI', ['$resource', '$log', 'GameStats', function ($resource, $log, GameStats) {
		// var UserData = $resource('http://localhost:8999/api/user');		// This is what it should be

		var User = $resource('http://localhost:8999/api/users/:userId/:resourceId', {userId: '@userId', resourceId: '@resourceId'}, {fetch: {method: 'GET'}});
		var Player = $resource('http://localhost:8999/api/players/:userId/:resourceId', {userId: '@userId', resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}});
		var Line = $resource('http://localhost:8999/api/lines/:userId/:resourceId/:type', {userId: '@userId', resourceId: '@resourceId', type: '@type'}, {sync: {method: 'GET', isArray: true}, change: {method: 'PUT'}});
		var GameEvent = $resource('http://localhost:8999/api/gameEvents/:userId/:resourceId', {userId: '@userId', resourceId: '@resourceId'}, {sync: {method: 'GET', isArray: true}});
		var Google = $resource('http://localhost:8999/api/login');

		var playerBucket = [];
		var UserData = {
			_id: undefined,
			players: undefined, 
			lines: undefined
		};

		//** HELPER METHODS **//
		var populatePlayerBucket = function (players) {
			for (var i = 0; i < players.length; i++) {
				playerBucket[players[i].playerNumber] = players[i];
			}
		};


		var parseLine = function (line) {
			if (UserData.players) { populatePlayerBucket(UserData.players); }
			var players = [];
			for (var player in line.players) { players.push(playerBucket[line.players[player]]); }
			if (line) {
				line.lineTitle		=		line.lineTitle;
				line.lineType		=		line.lineType;
				line.players		=		players;
			}
			return line;
		};

		var playersToNumbers = function (players) {
			var newPlayers = [];
			for (var player in players) { newPlayers.push(players[player].playerNumber); }
			return newPlayers;
		};

		var login = function (callback) {
			console.log('yay');
			var httpLogin = new Google();
			httpLogin.$get( function (result) {
				if (callback) { callback(result); }
				else { return result; }
			});
		};

		//** USER METHODS **//
		var fetchUser = function (user, callback) {
			var httpUser = new User({ userId: user.team });
			console.info('http', httpUser);
			httpUser.$fetch( function (result) {
				if (result) { 	
					populatePlayerBucket(result.players);
					var lineTypes = ['offence', 'defence'];
					for (var type in lineTypes) {
						type = lineTypes[type];
						for (var line in result.lines[type]) { result.lines[type][line] = parseLine(result.lines[type][line]); }
					}
					for(var i = 0; i < result.lines.length; i++) { result.lines[i] = parseLine(result.lines[i]); }
					UserData = result;
					UserData.stats = new GameStats(UserData.gameEvents, playerBucket);
					console.info('UserData:', UserData); 
				} 
				if (callback) { callback(result); }
				else { return result; }
			});
		};

		var getUser = function (user, callback) {
			if (UserData._id) {
				if (callback) { callback(UserData); }
				else { return UserData; }
			}
			else { fetchUser(user, callback); }
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
			//TODO
		};

		var removeUser = function () {
			//TODO
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
		var getLines = function (callback) {
			if (UserData.lines) {
				console.info('UserData.lines:', UserData.lines);
				if (callback) { callback(UserData.lines); }
				else { return UserData.lines; }
			}
			else { console.error('Lines not found!', UserData); }
		};

		var addLine = function (line, callback) {
			var lineTypes = ['offence', 'defence'];
			var type = lineTypes[line.lineType];
			var httpLine = new Line();
			console.debug(line);
			httpLine.user 		= 	UserData._id;
			httpLine.lineTitle 	=	line.lineTitle;
			httpLine.lineType 	=	line.lineType;
			httpLine.players	= 	playersToNumbers(line.players);
			console.info('httpLine:', httpLine);
			httpLine.$save( function (result) {
				if (result) { 
					var lineTypes = ['offence', 'defence'];
					line = parseLine(result.lines[type][result.lines[type].length - 1]);
					console.info(line);
					console.info('Added:', result);
					if (callback) { callback(line); }
					else { return line; }
				} 
			});
		};

		//TODO: Use index instead of passing in lines
		var modifyLine = function (index, newLine, callback) {
			var lineTypes = ['offence', 'defence'];
			var type = lineTypes[newLine.lineType];
			var httpLine = new Line();
			httpLine.user 		= 	UserData._id;
			httpLine.oldLine	=	UserData.lines[type][index]._id;
			httpLine.lineTitle 	=	newLine.lineTitle;
			httpLine.lineType 	=	newLine.lineType;
			httpLine.players	= 	playersToNumbers(newLine.players);
			$log.debug('httpLine:', httpLine);
			httpLine.$change( function (result) {
				if (result) {
					var line = parseLine(result.lines[type][index]);
					console.info('Changed:', line);
					if (callback) { callback(line); }
					else { return line; }
				} 
			});
		};

		var removeLine = function (line, callback) {
			var httpLine = new Line({ 	userId: 	UserData._id,
										resourceId: line._id ,
										type: 	line.lineType
									});
			httpLine.$delete( function (result) {
				if (result) { console.info('Removed:', result); }
				if (callback) { callback(line); }
				else { return line; }
			});
		};

		//** Game Event METHODS **//

		var getGameEvents = function (callback) {
			if (UserData.gameEvents) {
				console.info('UserData.gameEvents:', UserData.gameEvents);
				if (callback) { callback(UserData.gameEvents); }
				else { return UserData.gameEvents; }
			}
			else { console.error('Game Events not found!', UserData); }
		};

		var addGameEvents = function (gameInfo, callback) {
			var httpGameEvents = new GameEvent();
			httpGameEvents.user 			= 		UserData._id;
			httpGameEvents.game 			= 		gameInfo.game;
			httpGameEvents.opponent 		= 		gameInfo.opponent;
			httpGameEvents.home				=		gameInfo.home;
			httpGameEvents.location			=		gameInfo.location;
			httpGameEvents.startTime		=		gameInfo.startTime;
			httpGameEvents.endTime			=		gameInfo.endTime;
			httpGameEvents.period			= 		gameInfo.period;
			httpGameEvents.timeOn 			= 		gameInfo.gameEvents.timeOn;
			httpGameEvents.timeOff 			= 		gameInfo.gameEvents.timeOff;
			httpGameEvents.zoneStarts 		= 		gameInfo.gameEvents.zoneStarts;
			httpGameEvents.shotsOn 			= 		gameInfo.gameEvents.shotsOn;
			httpGameEvents.shotAttempts 	= 		gameInfo.gameEvents.shotAttempts;
			httpGameEvents.teamGoals 		= 		gameInfo.gameEvents.teamGoals;
			httpGameEvents.opponentGoals 	= 		gameInfo.gameEvents.opponentGoals;
			//$log.info('httpGameEvents:', httpGameEvents);
			httpGameEvents.$save( function (result) {
				if (result) {
					console.info('Added:', result);
					if (callback) { callback(result); }
					else { return result._id; }
				}
			});
		};

		var syncGameEvents = function (gameInfo, callback) {
			addGameEvents(gameInfo, function (result) {
				if (result) {
					populatePlayerBucket(result.players);
					for(var i = 0; i < result.lines.length; i++) { result.lines[i] = parseLine(result.lines[i]); }
					UserData = result;
					UserData.stats = new GameStats(UserData.gameEvents, playerBucket);
					if (callback) { callback(UserData._id); }
					else { return UserData._id; }
				}
			});
		};

		return {
			user: function () {
				return UserData._id;
			},
			players: function () {
				return UserData.players;
			},
			lines: function () {
				return UserData.lines;
			},
			bucket: function () {
				return playerBucket;
			},
			login: login,
			getUser: getUser,
			getPlayers: getPlayers,
			getLines: getLines,
			getGameEvents: getGameEvents,
			setUser: setUser,
			savePlayer: addPlayer,
			saveLine: addLine,
			saveGameEvents: addGameEvents,
			syncGameEvents: syncGameEvents,
			modifyUser: modifyUser,
			modifyLine: modifyLine,
			removeUser: removeUser,
			deletePlayer: removePlayer,
			deleteLine: removeLine,
			parseLine: parseLine
		};
	}]);
