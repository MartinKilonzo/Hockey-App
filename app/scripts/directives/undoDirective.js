'use-strict';

angular.module('HockeyApp')

	.directive('undoSupport', function () { 
		return {
			controller: function($scope) {
				var execuStack = [];
				var execuPointer = 0;

				this.push = function(action) {
					execuStack[execuPointer] = action;
					execuPointer++;

					//Empty the older actions in the stack ie. the redo portion of the stack
					execuStack.length = execuPointer;					
				};

				$scope.undo = function () {
					if ($scope.undoable) {
						execuPointer--;
						var undoAction = excuStack[execuPointer];
						undoAction.unExecute();
						$log.info('undone');
					}
				};

				$scope.redo = function () {
					if ($scope.redoable) {
						var redoAction = execuStack[execuPointer];
						redoAction.exectute();
						execuPointer++;
						$log.info('redone');
					}
				};

				$scope.undoable = false;
				$scope.redoable = false;

				// Watch to see if undoing is possible
				$scope.$watch( function () { 
					return execuStack.length > 0 && execuPointer >= 0;
				}, function (undoable) { 
					$scope.undoable = undoable;
				});

				// Watch to see if redoing is possible
				$scope.$watch( function () {
					return execuStack.length > 0 && execuPointer <= execuStack.length - 1;
				}, function (redoable) {
					$scope.redoable = redoable;
				});
			}
		};
	});