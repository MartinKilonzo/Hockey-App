'use strict';

angular.module('HockeyApp')

	.directive('rosterPlayer', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/roster-player.html'
		};
	})

	.directive('rosterInput', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/roster-input.html'
		}
	});