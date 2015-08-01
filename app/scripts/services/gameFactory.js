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

			update: function (players, period) {
				gameData.activePlayers = players;
				gameData.period = period;

				// var jsonObj = JSON.stringify(gameData);
				// localStorageService.set('gameData', jsonObj);
			}
		};
	}]);
