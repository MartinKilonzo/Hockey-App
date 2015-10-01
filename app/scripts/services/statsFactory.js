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

	var PlayerTotals = function () {
		this.period1 = new GameTotal();
		this.period2 = new GameTotal();
		this.period3 = new GameTotal();
		this.overTime = new GameTotal();
		this.totals = new GameTotal();
	};

	var GameStats = function (gameEvents, playerBucket) {
		this.maxPlayers = playerBucket.length;
		this.games = [];
		this.players = [];
		for (var p in playerBucket) { this.players[p] = new PlayerTotals(); }
		this.lineups = [];
		this.playerBucket = playerBucket;
		this.addGameStats(gameEvents);
	};

	GameStats.prototype.getGameTotals = function (periodEvents, period, game) {
		var games = new GameTotal();
		var stats = ['shotsOn', 'shotsAgainst', 'teamGoals', 'opponentGoals'];
		this.games[game][period] = new GameTotal();
		for (var stat in stats) {
			stat = stats[stat];
			for (var periodEvent in periodEvents[stat]) {
				var count = periodEvents[stat][periodEvent].count;
				this.games[game][period][stat] += count;
				this.games[game].totals[stat] += count;
			}
		}
	};

	GameStats.prototype.getPlayerTotals = function (periodEvents, period) {
		var i;
		var stats = ['shotsOn', 'shotsAgainst', 'teamGoals', 'opponentGoals'];
		for (var stat in stats) {
			stat = stats[stat];
			for (var periodEvent in periodEvents[stat]) {
				periodEvent = periodEvents[stat][periodEvent];
				for (var player in periodEvent.players) {
					player = periodEvent.players[player];
					var count = periodEvent.count;
					this.players[player][period][stat] += count;
					this.players[player].totals[stat] += count;
				}
			}
		}
	};

	GameStats.prototype.getLineupTotals = function () {

	};

	GameStats.prototype.addGameStats = function (gameEvents) {
		var periods = ['period1', 'period2', 'period3', 'overTime'];
		for (var game in gameEvents) {
			this.games[game] = new GameTotals();
			for (var period in periods) {
				period = periods[period];
				if (gameEvents[game].hasOwnProperty(period)) {
					this.getGameTotals(gameEvents[game][period], period, game);
					this.getPlayerTotals(gameEvents[game][period], period);
					this.getLineupTotals();
				}
			}
		}
	};

	return GameStats;
}]);
