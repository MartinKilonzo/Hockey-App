'use strict';

angular.module('HockeyApp')

  .controller('teamController', ['$scope', '$resource', '$log', function ($scope, $resource, $log) {

  	console.log('Loaded Team Controller.');

  	var GameEntry = $resource('/api/gamedb');

  	$scope.pageClass = 'page-team';
  	$scope.entries = [];

  	$scope.postTest = function () {
  		var entry = new GameEntry();
  		entry.name = $scope.entryName;
  		$scope.entries.push();
  		$log.info('Saving:', entry);
  		entry.$save();
  	};

  }]);
