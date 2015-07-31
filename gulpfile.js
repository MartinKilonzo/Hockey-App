'use strict';

var gulp = require('gulp');
var config = require('ng-factory').use(gulp);
var chalk = require('chalk');

var express = require('express');
var parser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var playerdbCtrl = require('./api/controllers/playerdb.js'); 

//** EXPRESS **//
var server = express();
var serverPort = 8999;

var configureServer = function () {
	server.use(cors());
	server.use(parser.urlencoded({ extended: false }));
	server.use(parser.json());
};


var startExpress = function () {	
	configureServer();
	//mongoose.connect('mongodb://localhost:27017/gamedb');
	mongoose.connect('mongodb://localhost:27017/app-test');

	/* GET METHODS */
	
	
	/* POST METHODS */
	server.post('/api/players', playerdbCtrl.create);

	/* DELETE METHODS */
	server.delete('/api/players/:resourceId', playerdbCtrl.delete);

	/* SERVER */
	server.listen(serverPort, function () {
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
		console.log('[' + chalk.gray(getTime()) + ']' + ' Database \'' + chalk.blue('Listening on port ' + serverPort) + '\'...');
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
gulp.task('data', function () {
gulp.watch('./api/**/*.js');
	startExpress();
});

//
// Hooks example

// var path = require('path');
// var src = config.src;
// gulp.task('ng:afterBuild', function() {
//   gulp.src(['bower_components/font-awesome/fonts/*.woff'], {cwd: src.cwd})
//     .pipe(gulp.dest(path.join(src.dest, 'fonts')));
// });
