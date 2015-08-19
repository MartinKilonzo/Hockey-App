'use strict';
var mongoose = require('mongoose');
var gameModels = require('../models/gameModels.js')(mongoose);
var ObjectId = mongoose.Types.ObjectId;

module.exports.getGame = function (req, res) {

};

module.exports.getGameEvents = function (req, res) {

};

module.exports.saveGame = function (req, res) {

};

module.exports.saveGameEvents = function (req, res) {
	console.log('Creating...\n', req.body);
	var User = mongoose.model('User');
	var newGameEvent;
	var i;

	User.findOne({ _id: new ObjectId(req.body.user) }, function (err, user) {
		if (err) { console.log('User not found.'); }
		else {
			for (i = 0; i < req.body.shotsOn.length; i++) {
				newGameEvent = new gameModels.GameEvent({	
					game		:		req.body.shotsOn[i].game,
					eventId		:		req.body.shotsOn[i].eventId,
					players		:		req.body.shotsOn[i].activePlayers,
					period		:		req.body.shotsOn[i].period,
					time		:		req.body.shotsOn[i].time,
					count		:		req.body.shotsOn[i].count
				});
				user.gameEvents.shotsOn.push(newGameEvent);
			}

			console.log('Finished ShotsOn:\t', i);

			for (i = 0; i < req.body.shotsAgainst.length; i++) {
				newGameEvent = new gameModels.GameEvent({	
					game		:		req.body.shotsAgainst[i].game,
					eventId		:		req.body.shotsAgainst[i].eventId,
					players		:		req.body.shotsAgainst[i].activePlayers,
					period		:		req.body.shotsAgainst[i].period,
					time		:		req.body.shotsAgainst[i].time,
					count		:		req.body.shotsAgainst[i].count
				});
				user.gameEvents.shotsAgainst.push(newGameEvent);
			}

			console.log('Finished shotsAgainst:\t', i);
			
			for (i = 0; i < req.body.teamGoals.length; i++) {
				newGameEvent = new gameModels.GameEvent({	
					game		:		req.body.teamGoals[i].game,
					eventId		:		req.body.teamGoals[i].eventId,
					players		:		req.body.teamGoals[i].activePlayers,
					period		:		req.body.teamGoals[i].period,
					time		:		req.body.teamGoals[i].time,
					count		:		req.body.teamGoals[i].count
				});
				user.gameEvents.teamGoals.push(newGameEvent);
			}

			console.log('Finished teamGoals:\t', i);
			

			for (i = 0; i < req.body.opponentGoals.length; i++) {
				newGameEvent = new gameModels.GameEvent({	
					game		:		req.body.opponentGoals[i].game,
					eventId		:		req.body.opponentGoals[i].eventId,
					players		:		req.body.opponentGoals[i].activePlayers,
					period		:		req.body.opponentGoals[i].period,
					time		:		req.body.opponentGoals[i].time,
					count		:		req.body.opponentGoals[i].count
				});
				console.log(newGameEvent);
				user.gameEvents.opponentGoals.push(newGameEvent);
			}

			console.log('Finished opponentGoals:\t', i);

			user.save( function (err, result) {
				if (err) { res.json(err); } 
				else { res.json(result); }
			});
		}
	});
};

module.exports.deleteGameEvents = function (req, res) {

};
