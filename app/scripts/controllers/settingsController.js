'use strict';

angular.module('HockeyApp')

  .controller('settingsController', function($scope) {

  	console.log('Loaded Settings Controller.');

  	$scope.pageClass = 'page-settings';

  	var messages = [	'Select a button to change its key',
  						'Change "Add Shots On" key: ',
  						'Change "Add Shots Against" key: ',
  						'Change "Add Team Goals" key: ',
  						'Change "Subtract Shots On" key: ',
  						'Change "Subtract Shots Against" key: ',
  						'Change "Subtract Team Goals" key: '		];

  	$scope.controlKey = 0;

  	$scope.setControl = function (index) {
  		$scope.controlKey = index;
  	};

  	$scope.getControlMessage = function () {
  		return messages[$scope.controlKey];
  	};

  	$scope.newKey = function (newKey) {
  		//Here we must change a global variable keys array; TODO: create array
  	};

  });
