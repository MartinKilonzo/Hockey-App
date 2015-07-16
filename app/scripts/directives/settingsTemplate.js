'use strict';

angular.module('HockeyApp')

	.directive('gameButtonTemplate', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/settings/settings-game-controls.html'
		};
	});
