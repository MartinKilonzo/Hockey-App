'use strict';

angular.module('HockeyApp')

	.factory('gameTimerFactory', ['$timeout', '$log', 
		function ($timeout, $log) {

		var seconds = 0;
		var minutes = 0;
		var hours =   0;

		var timerUnit = 47; // 47 chosen as it is a prime near 50 ms that is large enough to change the ms value frequently
		var timers = [];
		var stopped = false;
		var showMinutes = false;
		var gameInPlay = false;

		var startTime;
		var nextCall;

		var tick = function () {
			if(!startTime) {
				startTime = new Date().getTime();
				nextCall = startTime;
			}

			if (stopped) {
				nextCall = new Date().getTime();
				stopped = false;
			}

			nextCall += timerUnit;

			//var drift = (new Date().getTime() - $scope.startTime) % timerUnit;

			updateClock();
			timers.push($timeout(tick, nextCall - new Date().getTime()));
		};

		var stopTimer = function () {
			// Cancel the $timeout timers
			for (var i = 0; i < timers.length; i++) {
				$timeout.cancel(timers[i]);
			}
			timers = [];
			stopped = true;
		};

		var resetTimer = function () {
			stopTimer();
			stopped = false;
			startTime = 0;
			showMinutes = false;
			seconds = minutes = hours = 0;
		};

		var updateClock = function () {
			var newTime;

			// Update seconds
			newTime = seconds + timerUnit / 1000;
			seconds = newTime % 60;

			// Update minutes
			newTime = (minutes + (newTime / 60) | 0); // Bitwise OR used for truncation
			minutes = newTime % 60;

			if (minutes > 0 && !showMinutes)
				showMinutes = true;

			// Update hours
			hours += (newTime / 60) | 0; // Bitwise OR used for truncation
		};

		var formatTime = function () {
			var timeString= '';
			var tempString;

			// Format Hours:
			if (hours) {
				timeString = hours.toString() + ' : ';
			}

			// Format Minutes:
			if (showMinutes) {
				tempString = minutes.toString();

				while (tempString.length < 2)
					tempString = '0' + tempString;

				timeString += tempString + ' : ';
			}

			// Format Seconds:
			tempString = seconds.toString().split('.');

			// NULL case ie. no decimal
			if (!tempString[1])
				tempString[1] = '000';

			// While the whole portion has less than two digits, add padding
			while (tempString[0].length < 2)
				tempString[0] = '0' + tempString[0];

			// Truncate
			tempString[1] = tempString[1].slice(0, 3);

			// While the fractional portion has less than three digits, add padding
			while (tempString[1].length < 3)
				tempString[1] += '0';
			tempString = tempString[0] + '.' + tempString[1];
			// Return the padded tempStringing
			timeString += tempString;

			// Return the formatted string
			return timeString;
		};

		return {
			start: tick,
			stop: stopTimer,
			reset: resetTimer,
			seconds: seconds,
			minutes: minutes,
			hours: hours, 
			time: formatTime,
			startTime: startTime,
			isActive: gameInPlay
		};
	}]);
