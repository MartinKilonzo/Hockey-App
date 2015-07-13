'use strict';

angular.module('HockeyApp')

	.directive('selectable', ['$document', '$window', function ($document, $window) {
		return { 
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.data('selectable', true); // Bind the value to the element

				angular.element($document[0].body).click( function (event) {
					var selectable = angular.element(event.target).inheritedData('selectable');
					event.stopImmediatePropagation(); // Prevents firing from each 'selectable' DOM element
					
					// On offclick, reset the seleciton
					if (!selectable) {
						console.log(scope.positionSelection);
						scope.setSelectedPosition(undefined);
						scope.$apply(); // Run digest loop
					}
				});
			}
		};
	}]);
