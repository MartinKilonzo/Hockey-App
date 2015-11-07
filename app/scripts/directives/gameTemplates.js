'use strict';

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

	.directive('gameBoard', function ($window) {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/game/game-board.html',
			// Function which sizes the history box to the height of the game board
			link: function (scope, element, attrs) {
				var resize = angular.element($window).on('resize', function() {
					element.parent().find('.history').height(element.find('.game-board').css('height'));
				}).trigger('resize');
				angular.element($window).load(resize);
			}
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
