'use strict';

angular.module('HockeyApp')

.controller('gameController', function($scope) {

	console.log("Loaded Game Controller.");

	$scope.pageClass = 'page-game';

	$scope.lineups = ['lineup 1','lineup 2','lineup 3','lineup 4','lineup 5','lineup 6'];

  });
