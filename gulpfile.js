'use strict';

var gulp = require('gulp');
var config = require('ng-factory').use(gulp);
var chalk = require('chalk');

//
// Aliases

var startExpress = function () {
	var express = require('express');
	var app = express();
	var port = 8999;

	app.get('test', function (req, res) {
		console.log('Get Success on port' + port)
		});
	app.post('api/gamedb', function (req, res) {
		console.log('Posting' + this);
		});
	
	app.listen(port, function () {
		var getTime = function () {
			var date = new Date();
			var time = [date.getHours(), date.getMinutes(), date.getSeconds()];
			for (var i = 0; i < time.length; i++) {
				time[i] = time[i].toString();
				while(time[i].length < 2) {
					time[i] = '0' + time[i];
				}
			}

			return time[0] + ':' + time[1] + ':' + time[2];
		};
		console.log('[' + chalk.gray(getTime()) + ']' + ' Database \'' + chalk.blue('Listening on port ' + port) + '\'...');
		});
};

var serve = gulp.series('ng:serve');
var build = gulp.series('ng:build');

gulp.task('serve', serve);
gulp.task('build', build);
gulp.task('start', function () {
	startExpress();
	serve();
	});

//
// Hooks example

// var path = require('path');
// var src = config.src;
// gulp.task('ng:afterBuild', function() {
//   gulp.src(['bower_components/font-awesome/fonts/*.woff'], {cwd: src.cwd})
//     .pipe(gulp.dest(path.join(src.dest, 'fonts')));
// });
