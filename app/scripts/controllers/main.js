'use strict';

angular.module('HockeyApp')

.controller('MainCtrl', ['$scope', '$location', '$window', 'version', 'gameAPI', function ($scope, $location, $window, version, gameAPI) {
	var vm = this;
	vm.path = $location.path.bind($location);
	vm.version = version;

	$scope.logIn = function () {
		console.log('Logging in...');
		gameAPI.login(function (result) {
			console.log('url', result);
			$window.location.href = result.url;
		});
		gameAPI.getUser({ firstName: 'Martin', lastName: 'Kilonzo', team: 'Test Team 3' }, function (result) {
			vm.user = result.firstName;
		});
	};
}]);
