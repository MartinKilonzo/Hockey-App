'use strict';

angular.module('HockeyApp')

	.directive('lineTemplate', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/line/line-template.html'
		};
	})

	/* Template for new line modal */
	.directive('lineCreate', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/line/line-create.html'
		};
	})

	.directive('lineCreateMenu', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/line/line-create-menu.html'
		};
	})

	.directive('lineCreateForward', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/line/line-create-offence.html'
		};
	})

	.directive('lineCreateDefence', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/line/line-create-defence.html'
		};
	})


	/* Template for the player pool */
	.directive('linePlayerPool', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/line/line-player-pool.html'
		};
	})

	.directive('lineCreatePool', function() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/line/line-create-pool.html'
		};
	});