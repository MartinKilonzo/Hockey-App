'use strict';

angular.module('HockeyApp')
	.controller('userController', ['$scope', '$log', 'gameAPI', function ($scope, $log, gameAPI) {
		console.log('Started User Controller');

		$scope.canSubmit = function () {
			return $scope.firstName && $scope.lastName && $scope.team;
		};

		$scope.setUser = function () {
			var user = {
				firstName: $scope.firstName,
				lastName: $scope.lastName,
				team: $scope.team
			};
			$log.debug(user);
			gameAPI.setUser(user, function (result) {
				$scope.user = result;
				$log.info('$scope.user:', $scope.user);
			});

		};

		console.log('Ended User Controller');
	}]);