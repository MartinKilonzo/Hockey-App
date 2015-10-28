'use strict';

angular.module('HockeyApp')

	.factory('gameTimerFactory', ['$timeout', '$log', 
		function ($timeout, $log) {

		var milliseconds = 0;
		var seconds = 0;
		var minutes = 0;
		var hours =   0;

		var timerUnit = 47; // 47 chosen as it is a prime near 50 ms that is large enough to change the ms value frequently
		var timers = [];
		var stopped = false;
		var showMinutes = false;

		var startTime;
		var timeStop;
		var timeStart;
		var timePaused = 0;
		var nextCall;

		var currentTime = function () {
			return new Date().getTime() - timePaused - startTime;
		};

		var tick = function () {
			if(!startTime) {
				startTime = timeStop = timeStart = new Date().getTime();
				nextCall = startTime;
			}

			if (stopped) {
				nextCall = timeStart = new Date().getTime();
				timePaused += timeStart - timeStop;
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
			timeStop = new Date().getTime();
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
			var newTime = currentTime()/1000;

			seconds = (newTime) % 60;

			// Update minutes
			newTime = ((newTime - seconds) / 60) | 0; // Bitwise OR used for truncation
			minutes = newTime % 60;

			if (minutes > 0 && !showMinutes)
				showMinutes = true;

			// Update hours
			hours += ((newTime - minutes) / 60) | 0; // Bitwise OR used for truncation
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

		var getMilliseconds = function () {
			if (stopped) { return timeStop - timePaused - startTime; }
			else { return currentTime(); }
		};

		return {
			start: tick,
			stop: stopTimer,
			reset: resetTimer,
			seconds: seconds,
			minutes: minutes,
			hours: hours, 
			time: formatTime,
			milliseconds: getMilliseconds,
			startTime: startTime,
			isActive: stopped
		};
	}]);
