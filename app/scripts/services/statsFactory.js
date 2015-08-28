'use strict';

angular.module('HockeyApp')

.factory('GameStats', ['$log', function ($log) {
	var GameTotal = function () {
		this.shotsOn = 0;
		this.shotsAgainst = 0;
		this.teamGoals = 0;
		this.opponentGoals = 0;
	};

	var GameTotals = function () {
		this.period1 = [];
		this.period2 = [];
		this.period3 = [];
		this.overTime = [];
		this.totals = new GameTotal();
	};
	var GameStats = function (gameEvents, playerBucket) {
		this.maxPlayers = playerBucket.length;
		this.games = [];
		this.players = [];
		for (var p in playerBucket) { this.players[p] = new GameTotals(); }
		console.log(this.players);
		this.lineups = [];
		this.playerBucket = playerBucket;
		this.addGameStats(gameEvents);
		//this.addGameStats(gameEvents, playerBucket);
	};

	GameStats.prototype.getGameTotals = function (period, game) {
		var games = new GameTotal();
		var i;
		var count;
		for (i = 0; i < period.shotsOn.length; i++) {
			count = period.shotsOn[i].count;
			games.shotsOn += count;
			this.games[game].totals.shotsOn += count;
		}
		for (i = 0; i < period.shotsAgainst.length; i++) {
			count = period.shotsAgainst[i].count;
			games.shotsAgainst += count;
			this.games[game].totals.shotsAgainst += count;
		}
		for (i = 0; i < period.teamGoals.length; i++) {
			count = period.teamGoals[i].count;
			games.teamGoals += count;
			this.games[game].totals.teamGoals += count;
		}
		for (i = 0; i < period.opponentGoals.length; i++) {
			count = period.opponentGoals[i].count;
			games.opponentGoals += count;
			this.games[game].totals.opponentGoals += count;
		}
		return games;
	};

	GameStats.prototype.getPlayerTotals = function (period, players) {
		var i;
		var player;
		for (i = 0; i < period.shotsOn.length; i++) {
			for (player in period.shotsOn[i].players) {
				players[period.shotsOn[i].players[players]]++;
			}
		}
		for (i = 0; i < period.shotsAgainst.length; i++) {
			for (player in period.shotsAgainst[i].players) {
				players[period.shotsAgainst[i].players]++;
			}
		}
		for (i = 0; i < period.teamGoals.length; i++) {
			for (player in period.teamGoals[i].players) {
				players[period.teamGoals[i].players]++;
			}
		}
		for (i = 0; i < period.opponentGoals.length; i++) {
			for (player in period.opponentGoals[i].players) {
				players[period.opponentGoals[i].players]++;
			}
		}
	};

	GameStats.prototype.addGameStats = function (gameEvents) {
		for (var i = 0; i < gameEvents.length; i++) {
			this.games[i] = new GameTotals();
			if (gameEvents[i].hasOwnProperty('period1')) {
				this.games[i].period1 = this.getGameTotals(gameEvents[i].period1, i);
			}
			if (gameEvents[i].hasOwnProperty('period2')) {
				this.games[i].period2 = this.getGameTotals(gameEvents[i].period2, i);
			}
			if (gameEvents[i].hasOwnProperty('period3')) {
				this.games[i].period3 = this.getGameTotals(gameEvents[i].period3, i);
			}
			if (gameEvents[i].hasOwnProperty('overTime')) {
				this.games[i].overTime = this.getGameTotals(gameEvents[i].overTime, i);
			}
		}
	};

	var orderDescending = function (set) {
		//order the set from max to min
	};

	return GameStats;
}]);
