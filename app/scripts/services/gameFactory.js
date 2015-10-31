'use strict';

angular.module('HockeyApp')

	.factory('gameData', ['localStorageService', '$log',
		function (localStorageService, $log) {

		// var savedGameData = localStorageService.get('gameData');
		// var savedobj = JSON.parse(savedGameData);

		var gameData = {
			activePlayers: undefined,
			period: undefined
		};

		var initialize = function (game) {
			this.game = game.game;
			this.opponent = game.opponent;
			this.home = game.home;
			this.location = game.location;
			this.startTime = undefined;
			this.endTime = undefined;
			console.log(this);
		};

		return {
			getData: function () {
				return gameData;
			},

			getPlayers: function () {
				return gameData.activePlayers;
			},

			getPeriod: function () {
				return gameData.period;
			},

			setData: function (newGameData) {
				gameData = newGameData;
			},

			initialize: initialize,

			update: function (players, period) {
				gameData.activePlayers = players;
				gameData.period = period;

				// var jsonObj = JSON.stringify(gameData);
				// localStorageService.set('gameData', jsonObj);
			},
			getStartTime: function () {
				return gameData.startTime;
			},
			setStartTime: function (time) {
				gameData.startTime = time;
			},
			getEndTime: function () {
				return gameData.endTime;
			},
			setEndTime: function (time) {
				gameData.endTime = time;
			}
		};
	}]);
