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
			console.log(this.players);
		this.lineups = [];
		this.playerBucket = playerBucket;
		this.addGameStats(gameEvents);
	};

	GameStats.prototype.getGameTotals = function (periodEvents, game) {
		var games = new GameTotal();
		var stats = ['shotsOn', 'shotsAgainst', 'teamGoals', 'opponentGoals'];
		for (var stat in stats) {
			stat = stats[stat];
			for (var periodEvent in periodEvents[stat]) {
				var count = periodEvents[stat][periodEvent].count;
				games[stat] += count;
				this.games[game].totals[stat] += count;
			}
		}
		return games;
	};

	GameStats.prototype.addPlayerStat = function (player, period, count) {
		if (period === 1) { this.players[player].period1 += count; }
		if (period === 2) { this.players[player].period2 += count; }
		if (period === 3) { this.players[player].period3 += count; }
		if (period === 4) { this.players[player].overTime += count; }
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
					console.log(player);
					this.players[player][period][stat] += count;
					this.players[player].totals[stat] += count;
				}
			}
		}
	};

	GameStats.prototype.addGameStats = function (gameEvents) {
		var periods = ['period1', 'period2', 'period3', 'overTime'];
		for (var i = 0; i < gameEvents.length; i++) {
			this.games[i] = new GameTotals();
			for (var period in periods) {
				period = periods[period];
				if (gameEvents[i].hasOwnProperty(period)) {
					this.games[i][period] = this.getGameTotals(gameEvents[i][period], i);
					this.getPlayerTotals(gameEvents[i][period], period);
				}
			}
		}
	};

	var orderDescending = function (set) {
		//order the set from max to min
	};

	return GameStats;
}]);
