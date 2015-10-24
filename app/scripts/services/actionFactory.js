'use strict';

angular.module('HockeyApp')
	
	.factory('Action', function () {
		/* 
		 *	Constructor for Action.
		 */
		var Action = function (oldVal, newVal, applier, unapplier) {
			this.oldVal = oldVal;
			this.newVal = newVal;
			this.applier = applier;
			this.unapplier = unapplier;
		};

		/* 
		 *	Function for executing actions. Also used by redo.
		 */
		Action.prototype.execute = function () {
				this.applier(this.newVal);
				console.log(this);
		};

		/* 
		 *	Function for executing actions. Used by undo.
		 */
		Action.prototype.unExecute = function () {
			if (this.unapplier) { this.unapplier(this.oldVal); }
			else { this.applier(this.oldVal); }
			console.log(this);
		};

		return Action;
	})

	.factory('ActionStack', function ($log) {
		/* 
		 *	Constructor for ActionStack.
		 */
		var ActionStack = function() {
			this.stack = [];
			this.pointer = 0;
		};

		/* 
		 *	Function for pushing new actions onto the ActionStack.
		 */
		ActionStack.prototype.push = function (action) {
			this.stack[this.pointer] = action;
			this.pointer++;

			//Empty the older actions in the stack by trimming the stack ie. "dump" the redo portion of the stack
			this.stack.length = this.pointer;
			console.log(this);
		};

		return ActionStack;
	})

	.factory('actionService', ['$rootScope', 'Action', 'ActionStack', function ($rootScope, Action, ActionStack) {
		var actionStack = new ActionStack();	// The ActionStack that will be created to persist the stack data between views
		var undoable = false;		// Flag that indicates if there is room in the stack to undo an action
		var redoable = false;		// Flag that indicates if there is room in the stack to redo an action

		// Watch to see if undoing is possible
		$rootScope.$watch( function () { 
			return actionStack.stack.length > 0 && actionStack.pointer > 0;
		}, function (state) {
			undoable = state;
		});


		// Watch to see if redoing is possible
		$rootScope.$watch( function () {
			return actionStack.stack.length > 0 && actionStack.pointer <= actionStack.stack.length - 1;
		}, function (state) {
			redoable = state;
		});

		/* 
		 *	Polymorphic function for pushing new actions onto the action stack object which persists between views.
		 */
		var push = function(action) {
			actionStack.push(action);
			action.execute();
		};

		/* 
		 *	Function for undoing actions.
		 */
		var undo = function () {
			if (undoable) {
				actionStack.pointer--;
				var undoAction = actionStack.stack[actionStack.pointer];
				undoAction.unExecute();
			}
		};

		/* 
		 *	Function for redoing actions.
		 */
		var redo = function () {
			if (redoable) {
				var redoAction = actionStack.stack[actionStack.pointer];
				redoAction.execute();
				actionStack.pointer++;
			}
		};

		return {
			push: push,
			undo: undo,
			redo: redo,
			// Function chosen to avoid dirty binding
			canUndo: function () {
				return undoable;
			},
			// Function chosen to avoid dirty binding
			canRedo: function () {
				return redoable;
			}
		};
	}]);
