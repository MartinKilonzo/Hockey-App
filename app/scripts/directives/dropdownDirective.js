'use strict';

angular.module('HockeyApp')

	.directive('dropdown', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.hover( function () {
					var dropdown = element.children('.dropdown-menu');
					dropdown.removeClass('display_none');
					dropdown.fadeIn(400);
				}, function () {
					var dropdown = element.children('.dropdown-menu');
					dropdown.finish().delay(100).fadeOut(300);
					dropdown.addClass('display_none');
				});
			}
		};
	});
