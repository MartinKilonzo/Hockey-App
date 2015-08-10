'use strict';

angular.module('HockeyApp')

.controller('MainCtrl', ['$scope', '$location', 'version', 'gameAPI', function ($scope, $location, version, gameAPI) {
	var vm = this;
	vm.path = $location.path.bind($location);
	vm.version = version;

	$scope.logIn = function () {
		gameAPI.getUser({ firstName: 'Martin', lastName: 'Kilonzo', team: 'Test Team 3' }, function (result) {
			vm.user = result.firstName;
		});
	};

	$scope.logIn();

	/* Dropdown menu interaction */
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
	});
}]);
