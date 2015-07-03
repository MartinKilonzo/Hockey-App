'use-strict';

angular.module('HockeyApp')

	.directive('gameButtons', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/game/game-buttons.html'
		};
	})

	.directive('gameToggles', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/game/game-toggles.html'
		};
	})

	.directive('gameBoard', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/game/game-board.html'
		};
	})

	.directive('gameHistory', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/game/game-history.html'
		};
	})

	.directive('gamePlayer', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/game/game-player.html'
		};
	})

	.directive('gameLineup', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/game/game-lineup.html'
		};
	})

	.directive('gameTimer', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/game/game-timer.html',
			controller: 'timerController'
		};
	});
