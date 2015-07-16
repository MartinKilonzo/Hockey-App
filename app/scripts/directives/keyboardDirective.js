'use strict';

angular.module('HockeyApp')

	.directive('keyboardSupport', function () {
		return {
			restrict: 'A',
			controller: 'gameController',
			link: function (scope, element, attrs, ctrl) {
				console.log(ctrl);
				var page = element.closest('html');
				console.log(page);
				page.bind('keydown', function (event) {
					
					// CTRL + keys
					if (event.ctrlKey) {
						if (event.which === 90)
							ctrl.undo();

						if (event.which === 89)
							ctrl.redo();
					}
					//TODO: Make these modifiable from settingsController
					// q = +1 shots on
					else if (event.which === 81) {
						ctrl.addShotsOn();
					}
					// a = -1 shots on
					else if (event.which === 65) {
						ctrl.subtShotsOn();
					}
					// w = +1 shots against
					else if (event.which === 87) {
						console.log('w');
					}
					// s = -1 shots against
					else if (event.which === 83) {
						ctrl.subtShotsAgainst();
					}
					// e = +1 team goals
					else if (event.which === 69) {
						ctrl.addTeamGoal();
					}
					// d = =1 opponent goals
					else if (event.which === 68) {
						ctrl.addOpponentGoal();
					}

				});
			}
		};
	});