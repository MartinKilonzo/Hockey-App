'use strict';

angular.module('HockeyApp')

	.directive('popover', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$(element).hover( function () {
					$(element).popover('show');
				}, function () {
					$(element).popover('hide');
				});
			}
		};
	});
	