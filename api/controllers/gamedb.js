'use strict';
var mongoose = require('mongoose');
var gameModels = require('../models/gameModels.js')(mongoose);

module.exports.getGame = function (req, res) {

};

module.exports.getGameEvents = function (req, res) {

};

module.exports.saveGame = function (req, res) {

};

module.exports.saveGameEvents = function (req, res) {
	console.log('Creating...\n', req.body);
	var newGameEvents;
	var newGameEvent;
	var i;

	var callback = function (err, result) {
		res.json(result);
		console.log(err);
	};

	var reps = Math.ceil(req.body.shotsOn.length / 1000);
	console.log('reps:', reps);
	
	while (reps > 0) {
		newGameEvents = [];
		for (i = 0; i < req.body.shotsOn.length && i < 1000; i++) {
			newGameEvent = new gameModels.GameEvent({	
				game		:		req.body.shotsOn[i].game,
				eventId		:		req.body.shotsOn[i].eventId,
				players		:		req.body.shotsOn[i].players,
				period		:		req.body.shotsOn[i].period,
				time		:		req.body.shotsOn[i].time,
				stat 		:		req.body.shotsOn[i].stat,
				count		:		req.body.shotsOn[i].count,
				collection	: 		'shotsOn'	
			});
			newGameEvents.push(newGameEvent);
			console.log('index:', i);
		}
		gameModels.GameEvent.collection.insert(newGameEvents, callback());
		reps--;
	}
	reps = Math.ceil(req.body.shotsAgainst.length / 1000);
	console.log('reps:', reps);
	while (reps > 0) {
		newGameEvents = [];
		for (i = 0; i < req.body.shotsAgainst.length && i < 1000; i++) {
			newGameEvent = new gameModels.GameEvent({	
				game		:		req.body.shotsAgainst[i].game,
				eventId		:		req.body.shotsAgainst[i].eventId,
				players		:		req.body.shotsAgainst[i].players,
				period		:		req.body.shotsAgainst[i].period,
				time		:		req.body.shotsAgainst[i].time,
				stat 		:		req.body.shotsAgainst[i].stat,
				count		:		req.body.shotsAgainst[i].count,
				collection	: 		'shotsAgainst'	
			});
			newGameEvents.push(newGameEvent);
			console.log('index:', i);
		}
		gameModels.GameEvent.collection.insert(newGameEvents, callback());
		reps--;
	}
	reps = Math.ceil(req.body.teamGoals.length / 1000);
	console.log('reps:', reps);
	while (reps > 0) {
		newGameEvents = [];
		for (i = 0; i < req.body.teamGoals.length && i < 1000; i++) {
			newGameEvent = new gameModels.GameEvent({	
				game		:		req.body.teamGoals[i].game,
				eventId		:		req.body.teamGoals[i].eventId,
				players		:		req.body.teamGoals[i].players,
				period		:		req.body.teamGoals[i].period,
				time		:		req.body.teamGoals[i].time,
				stat 		:		req.body.teamGoals[i].stat,
				count		:		req.body.teamGoals[i].count,
				collection	: 		'teamGoals'	
			});
			newGameEvents.push(newGameEvent);
			console.log('index:', i);
		}
		gameModels.GameEvent.collection.insert(newGameEvents, callback());
		reps--;
	}
	reps = Math.ceil(req.body.opponentGoals.length / 1000);
	console.log('reps:', reps);
	while (reps > 0) {
		newGameEvents = [];
		for (i = 0; i < req.body.opponentGoals.length && i < 1000; i++) {
			newGameEvent = new gameModels.GameEvent({	
				game		:		req.body.opponentGoals[i].game,
				eventId		:		req.body.opponentGoals[i].eventId,
				players		:		req.body.opponentGoals[i].players,
				period		:		req.body.opponentGoals[i].period,
				time		:		req.body.opponentGoals[i].time,
				stat 		:		req.body.opponentGoals[i].stat,
				count		:		req.body.opponentGoals[i].count,
				collection	: 		'opponentGoals'	
			});
			newGameEvents.push(newGameEvent);
			console.log('index:', i);
		}
		gameModels.GameEvent.collection.insert(newGameEvents, callback());
		reps--;
	}
};

module.exports.deleteGameEvents = function (req, res) {

};
