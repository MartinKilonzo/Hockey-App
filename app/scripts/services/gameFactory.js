'use strict';

angular.module('HockeyApp')

	.factory('gameData', ['$rootScope', 'localStorageService', '$log',
		function ($rootScope, localStorageService, $log) {

		// var savedGameData = localStorageService.get('gameData');
		// var savedobj = JSON.parse(savedGameData);

		var gameData = {
			actionStack: undefined,
			activePlayers: undefined,
			period: undefined
		};

		return {
			getData: function () {
				return gameData;
			},

			getStack: function () {
				return gameData.actionStack;
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

			update: function (stack, players, period) {
				gameData.actionStack = stack;
				gameData.activePlayers = players;
				gameData.period = period;

				// var jsonObj = JSON.stringify(gameData);
				// localStorageService.set('gameData', jsonObj);
			}
		};
	}]);
