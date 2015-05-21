'use strict';

angular.module('HockeyApp')

	.directive('lineupTemplate', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/lineup-template.html'
		};
	})

	.directive('lineupPlayerPool', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/lineup-player-pool.html'
		};
	});