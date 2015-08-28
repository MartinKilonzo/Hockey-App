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
	};
	var GameStats = function (gameEvents, playerBucket) {
		this.maxPlayers = playerBucket.length;
		this.games = [];
		this.players = [];
		this.lineups = [];
		this.test(gameEvents);
		//this.addGameStats(gameEvents, playerBucket);
	};

	var getGameTotals = function (period) {
		var games = new GameTotal();
		var i;		
		for (i = 0; i < period.shotsOn.length; i++) {
			games.shotsOn += period.shotsOn[i].count;
		}
		for (i = 0; i < period.shotsAgainst.length; i++) {
			games.shotsAgainst += period.shotsAgainst[i].count;
		}
		for (i = 0; i < period.teamGoals.length; i++) {
			games.teamGoals += period.teamGoals[i].count;
		}
		for (i = 0; i < period.opponentGoals.length; i++) {
			games.opponentGoals += period.opponentGoals[i].count;
		}
		return games;
	};

	var getPlayerTotals = function (period) {
		var players = new GameTotal();
		var i;
		for (i = 0; i < period.shotsOn.length; i++) {

		}
		for (i = 0; i < period.shotsAgainst.length; i++) {

		}
		for (i = 0; i < period.teamGoals.length; i++) {

		}
		for (i = 0; i < period.opponentGoals.length; i++) {

		}
		return players;

	};

	GameStats.prototype.test = function (gameEvents) {
		for (var game = 0; game < gameEvents.length; game++) {
			this.games[game] = {};
			if (gameEvents[game].hasOwnProperty('period1')) {
				this.games[game].period1 = getGameTotals(gameEvents[game].period1);
			}
			if (gameEvents[game].hasOwnProperty('period2')) {
				this.games[game].period2 = getGameTotals(gameEvents[game].period2);
			}
			if (gameEvents[game].hasOwnProperty('period3')) {
				this.games[game].period3 = getGameTotals(gameEvents[game].period3);
			}
			if (gameEvents[game].hasOwnProperty('overTime')) {
				this.games[game].overTime = getGameTotals(gameEvents[game].overTime);
			}
		}
	};

	GameStats.prototype.addGameStats = function (gameEvents, playerBucket) {
		for (var game in gameEvents) {
			for (var period in game) {
				var i;
				for (i = 0; i < period.shotsOn.length; i++) {

				}
				for (i = 0; i < period.shotsAgainst.length; i++) {
					
				}
				for (i = 0; i < period.teamGoals.length; i++) {
					
				}
				for (i = 0; i < period.opponentGoals.length; i++) {
					
				}
			}
		}
		//calculate the shots on stat for all players
		//calculate the shots against stat for all players
		//calculate the team goals stat for all players
		//calculate the opponent on stat for all players
	};

	var orderDescending = function (set) {
		//order the set from max to min
	};

	return GameStats;
}]);
