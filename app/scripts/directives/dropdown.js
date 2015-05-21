'use strict';

angular.module('HockeyApp')

.directive('showDropdown', function() {

	return {
		restrict: 'EAC',
		link : function(scope, elemeent, attrs) {

			/* Dropdown menu interaction; Convert to Angular
			var mouseOverTimeout;
			var menu;
			$('.dropdown').mouseenter(function() {

				menu = $(this).children('.dropdown-menu');
				mouseOverTimeout = setTimeout(function() {
					menu.show(400);

				}, 400);
			}).mouseleave(function() {
				clearTimeout(mouseOverTimeout);
				menu.delay(400).hide(300);
			});*/
		}
	};
});



