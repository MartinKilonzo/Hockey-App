'use strict';

angular.module('HockeyApp')

	.directive('keyboardSupport', ['$location', function ($location) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs, ctrl) {
				var page = element.closest('html');
				page.bind('keydown', function (event) {
					if ($location.url() === '/game') {
						// CTRL + keys
						if (event.ctrlKey) {
							// Ctrl + z to undo
							if (event.which === 90){
								scope.$apply(scope.undo());
							}
							// Ctrl + y to undo
							if (event.which === 89){
								scope.$apply(scope.redo());
							}
						}
						//TODO: Make these modifiable from settingsController
						// q = +1 shots on
						else if (event.which === 81) {
							scope.addShotsOn();
						}
						// a = -1 shots on
						else if (event.which === 65) {
							scope.subtShotsOn();
						}
						// w = +1 shots against
						else if (event.which === 87) {
							scope.addShotsAgainst();
						}
						// s = -1 shots against
						else if (event.which === 83) {
							scope.subtShotsAgainst();
						}
						// e = +1 team goals
						else if (event.which === 69) {
							scope.addTeamGoal();
						}
						// d = =1 opponent goals
						else if (event.which === 68) {
							scope.addOpponentGoal();
						}
						// space or j to toggle timer
						else if (event.which === 32 || event.which === 74) {
							scope.toggleTimer();
						}
					}
				});
			}
		};
	}]);