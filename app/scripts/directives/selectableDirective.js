'use strict';

angular.module('HockeyApp')

	.directive('selectable', ['$document', '$window', function ($document, $window) {
		return { 
			restrict: 'A',
			link: function (scope, element, attrs) {
					element.data('selectable', true); // Bind the value to the element

					angular.element($document[0].body).click( function (event) {
						var selectable = angular.element(event.target).inheritedData('selectable');

						if (selectable) {
							event.stopImmediatePropagation(); // Prevents firing from each 'selectable' DOM element
						}

						// On offclick, reset the seleciton
						if (!selectable) {
							var target = $(event.target);

							// If the element is a link, stopping propagation breaks the link event
							if (!target.is('a')) {
								event.stopImmediatePropagation();
							}
							scope.setSelectedPosition(undefined);
							scope.$apply(); // Run digest loop
						}
					});
				}
			};
		}]);
