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
}]);
