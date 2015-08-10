'use strict';

angular.module('HockeyApp')

	.directive('dropdown', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.hover( function () {
					element.dropdown('toggle');
					element.children('.dropdown-menu').fadeIn(400);
				}, function () {
					element.dropdown('toggle');
					element.children('.dropdown-menu').finish().delay(100).fadeOut(300);
				});
			}
		};
	});
