'use strict';

angular.module('HockeyApp')
	
	/* Template for the displaying each lineuo */
	.directive('lineupTemplate', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/lineup-template.html'
		};
	})

	/* Template for the player pool */
	.directive('lineupPlayerPool', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/lineup-player-pool.html'
		};
	})

	/* Template for new lineup modal - UNUSED */
	.directive('lineupCreate', function() {

		return {
			restrict: "E",
			templateUrl: 'views/partials/lineup-create.html'
		};
	});