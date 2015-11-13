'use strict';

angular.module('HockeyApp')

.factory('GameStats', ['$log', function ($log) {
	var GameTotal = function () {
		this.timeOn = 0;
		this.timeOff = 0;
		this.zoneStarts = {
			strongDef: 0,
			weakDef: 0,
			neutral: 0,
			weakOff: 0,
			strongOff: 0
		};
		this.shotsOn = 0;
		this.shotAttempts = 0;
		this.teamGoals = 0;
		this.opponentGoals = 0;
	};

	var PlayerTotal = function () {
		this.timeOn = [];
		this.timeOff = [];
		this.iceTime = 0;
		this.zoneStarts = {
			strongDef: 0,
			weakDef: 0,
			neutral: 0,
			weakOff: 0,
			strongOff: 0
		};
		this.shotsOn = 0;
		this.shotAttempts = 0;
		this.teamGoals = 0;
		this.opponentGoals = 0;
	};

	var GameTotals = function (gameEvents) {
		this.game = gameEvents.game;
		this.home = gameEvents.home;
		this.location = gameEvents.location;
		this.opponent = gameEvents.opponent;
		this.startTime = gameEvents.startTime;
		this.period1 = [];
		this.period2 = [];
		this.period3 = [];
		this.overTime = [];
		this.totals = new GameTotal();
		this.totals.iceTime = gameEvents.endTime;
	};

	var PlayerTotals = function () {
		this.period1 = new PlayerTotal();
		this.period2 = new PlayerTotal();
		this.period3 = new PlayerTotal();
		this.overTime = new PlayerTotal();
		this.totals = new PlayerTotal();
	};

	var GameStats = function (gameEvents, playerBucket) {
		this.maxPlayers = playerBucket.length;
		this.games = [];
		this.players = [];
		for (var p in playerBucket) { this.players[p] = new PlayerTotals(); }
		this.lines = [];
		this.playerBucket = playerBucket;
		this.addGameStats(gameEvents);
	};

	/*
	 *	Function that generates stat summaries for each statistic on a per period, per game basis.
	 *
	 *	@param periodEvents	- the stats (events) that have occured in the game's period to be summarized
	 *	@param period 		- the period within the game for which stats are being summarized
	 *	@param game 		- the game for which stats are being summarized
	 */
	GameStats.prototype.getGameTotals = function (periodEvents, period, game) {
		var stat, periodEvent;
		game = this.games[game];
		// Game Button Totals
		var stats = ['shotsOn', 'shotAttempts', 'teamGoals', 'opponentGoals'];
		game[period] = new GameTotal();
		for (stat in stats) {
			stat = stats[stat];
			for (periodEvent in periodEvents[stat]) {
				var count = periodEvents[stat][periodEvent].count;
				game[period][stat] += count;
				game.totals[stat] += count;
			}
		}
		// Substitution Totals
		stats = ['timeOn', 'timeOff'];
		for (stat in stats) {
			stat = stats[stat];
			for (periodEvent in periodEvents[stat]) {
				game.totals[stat]++;
			}
		}
		//Zone Starts Totals
		stats = ['strongDef', 'weakDef', 'neutral', 'weakOff', 'strongOff'];
		for (periodEvent in periodEvents.zoneStarts) {
			stat = stats[periodEvents.zoneStarts[periodEvent].count + 2];
			game[period].zoneStarts[stat]++;
			game.totals.zoneStarts[stat]++;
		}
	};
	
	/*
	 *	Function that generates stat summaries for each statistic on a per period, per game basis.
	 *
	 *	@param periodEvents	- the stats (events) to be summarized for each player
	 *	@param period 		- the period within each game where for which stats are being summarized
	 */
	GameStats.prototype.getPlayerTotals = function (periodEvents, period) {
		var i, stat, periodEvent, player, count;
		// Game Button Totals
		var stats = ['teamGoals', 'shotsOn', 'shotAttempts', 'opponentGoals'];
		for (stat in stats) {
			stat = stats[stat];
			for (periodEvent in periodEvents[stat]) {
				periodEvent = periodEvents[stat][periodEvent];
				for (player in periodEvent.players) {
					player = periodEvent.players[player];
					count = periodEvent.count;
					this.players[player][period][stat] += count;
					this.players[player].totals[stat] += count;
				}
			}
		}
		// Time On Ice
		stats = ['timeOn', 'timeOff'];
		for (stat in stats) { 
			stat = stats[stat];
			for (periodEvent in periodEvents[stat]) {
				periodEvent = periodEvents[stat][periodEvent];
				for (player in periodEvent.players) {
					player = periodEvent.players[player];
					this.players[player][period][stat].push(periodEvent);
				}
			}
		}

		//Zone Starts Totals
		stats = ['strongDef', 'weakDef', 'neutral', 'weakOff', 'strongOff'];
		for (periodEvent in periodEvents.zoneStarts) {
			periodEvent = periodEvents.zoneStarts[periodEvent];
			stat = stats[periodEvent.count + 2];
			for (player in periodEvent.players) {
				player = periodEvent.players[player];
				this.players[player].totals.zoneStarts[stat]++;
			}
		}
	};

	GameStats.prototype.getLineTotals = function () {

	};

	GameStats.prototype.addGameStats = function (gameEvents) {
		var period;
		var periods = ['period1', 'period2', 'period3', 'overTime'];
		for (var game in gameEvents) {
			this.games[game] = new GameTotals(gameEvents[game]);
			for (period in periods) {
				period = periods[period];
				if (gameEvents[game].hasOwnProperty(period)) {
					this.getGameTotals(gameEvents[game][period], period, game);
					this.getPlayerTotals(gameEvents[game][period], period);
					this.getLineTotals();
				}
			}
		}

		// Calculate the ice time for the players
		for (var player in this.players) {
			player = this.players[player];
			for (period in periods) {
				period = periods[period];
				for (var periodEvent in player[period].timeOn) {
					var count = player[period].timeOff[periodEvent].time - player[period].timeOn[periodEvent].time;
					player[period].iceTime += count;
					player.totals.iceTime += count;
				}
			}
		}
	};

	return GameStats;
}]);
