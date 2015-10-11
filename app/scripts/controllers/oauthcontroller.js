'use strict';

angular.module('HockeyApp')

.controller('oauthController', ['$scope', '$location', 'gameAPI', function ($scope, $location, gameAPI) {
	console.log($location.path);
	console.log($location);
}]);
