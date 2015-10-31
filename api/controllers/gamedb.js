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

var populateGameData = function (gameEvents, req) {
	var newGameEvent;
	var i;
	// Assign game data
	for (i = 0; i < req.body.timeOn.length; i++) {
		newGameEvent = new gameModels.GameEvent({	
			game		:		req.body.timeOn[i].game,
			eventId		:		req.body.timeOn[i].eventId,
			players		:		req.body.timeOn[i].player,
			period		:		req.body.timeOn[i].period,
			time		:		req.body.timeOn[i].time
		});
		gameEvents.timeOn.push(newGameEvent);
	}
		// console.log('Finished timeOn:\t', i);

	for (i = 0; i < req.body.timeOff.length; i++) {
		newGameEvent = new gameModels.GameEvent({	
			game		:		req.body.timeOff[i].game,
			eventId		:		req.body.timeOff[i].eventId,
			players		:		req.body.timeOff[i].player,
			period		:		req.body.timeOff[i].period,
			time		:		req.body.timeOff[i].time,
		});
		gameEvents.timeOff.push(newGameEvent);
	}
		// console.log('Finished timeOff:\t', i);

	for (i = 0; i < req.body.zoneStarts.length; i++) {
		newGameEvent = new gameModels.GameEvent({	
			game		:		req.body.zoneStarts[i].game,
			eventId		:		req.body.zoneStarts[i].eventId,
			players		:		req.body.zoneStarts[i].activePlayers,
			period		:		req.body.zoneStarts[i].period,
			time		:		req.body.zoneStarts[i].time,
			count		:		req.body.zoneStarts[i].count
		});
		gameEvents.zoneStarts.push(newGameEvent);
	}
		// console.log('Finished zoneStarts:\t', i);

	for (i = 0; i < req.body.shotsOn.length; i++) {
		newGameEvent = new gameModels.GameEvent({	
			game		:		req.body.shotsOn[i].game,
			eventId		:		req.body.shotsOn[i].eventId,
			players		:		req.body.shotsOn[i].activePlayers,
			period		:		req.body.shotsOn[i].period,
			time		:		req.body.shotsOn[i].time,
			count		:		req.body.shotsOn[i].count
		});
		gameEvents.shotsOn.push(newGameEvent);
	}
		// console.log('Finished ShotsOn:\t', i);

	for (i = 0; i < req.body.shotsAgainst.length; i++) {
		newGameEvent = new gameModels.GameEvent({	
			game		:		req.body.shotsAgainst[i].game,
			eventId		:		req.body.shotsAgainst[i].eventId,
			players		:		req.body.shotsAgainst[i].activePlayers,
			period		:		req.body.shotsAgainst[i].period,
			time		:		req.body.shotsAgainst[i].time,
			count		:		req.body.shotsAgainst[i].count
		});
		gameEvents.shotsAgainst.push(newGameEvent);
	}
	// console.log('Finished shotsAgainst:\t', i);

	for (i = 0; i < req.body.teamGoals.length; i++) {
		newGameEvent = new gameModels.GameEvent({	
			game		:		req.body.teamGoals[i].game,
			eventId		:		req.body.teamGoals[i].eventId,
			players		:		req.body.teamGoals[i].activePlayers,
			period		:		req.body.teamGoals[i].period,
			time		:		req.body.teamGoals[i].time,
			count		:		req.body.teamGoals[i].count
		});
		gameEvents.teamGoals.push(newGameEvent);
	}
	// console.log('Finished teamGoals:\t', i);


	for (i = 0; i < req.body.opponentGoals.length; i++) {
		newGameEvent = new gameModels.GameEvent({	
			game		:		req.body.opponentGoals[i].game,
			eventId		:		req.body.opponentGoals[i].eventId,
			players		:		req.body.opponentGoals[i].activePlayers,
			period		:		req.body.opponentGoals[i].period,
			time		:		req.body.opponentGoals[i].time,
			count		:		req.body.opponentGoals[i].count
		});
		gameEvents.opponentGoals.push(newGameEvent);
	}
};

module.exports.saveGameEvents = function (req, res) {
	console.log('Creating...\n', req.body);
	var User = mongoose.model('User');
	var gameEvents;

	User.findOne({ _id: new ObjectId(req.body.user) }, function (err, user) {
		if (err) { console.log('User not found.'); }
		else {

			var game = {};

			// Find the existing entry for the game, if one exists. If not, initialize game
			for (var igameEvents = 0; igameEvents < user.gameEvents.length; igameEvents++) {
				if (user.gameEvents[igameEvents].game === req.body.game) { break; }
			}
			// console.log('GameEvents from User: ', user.gameEvents);
			// console.log('igameEvents: ', igameEvents, 'user.gameEvents.length', user.gameEvents.length);
			// If the game exists...
			if (igameEvents < user.gameEvents.length) {
				//Find the game...
				game = user.gameEvents.id(user.gameEvents[igameEvents]._id);
				//If the period in question already exists, we will append data to it
				if (req.body.period === 1 && game.period1) { gameEvents = game.period1; console.log('pull period1');}
				else if (req.body.period === 2 && game.period2) { gameEvents = game.period2; console.log('pull period2');}
				else if (req.body.period === 3 && game.period3) { gameEvents = game.period3; console.log('pull period3');}
				else if (req.body.period === 4 && game.overTime) { gameEvents = game.overTime; console.log('pull period4');}
				//Otherwise, we create a new entry for the period
				else { gameEvents = new gameModels.GameEvents(); console.log('new');}
			}

			// Otherwise the game does no exist, create a new game entirely
			else { gameEvents = new gameModels.GameEvents(); console.log('brand new');}

			// Populate the game data object
			populateGameData(gameEvents, req);

			// Update the meta data of the game
			game.game = req.body.game;
			game.startTime = req.body.startTime;
			game.endTime = req.body.endTime;
			game.opponent = req.body.opponent;
			game.home = req.body.home;
			game.location = req.body.location;
			if (req.body.period === 1) { game.period1 = gameEvents; console.log('push old period1');}
			else if (req.body.period === 2) { game.period2 = gameEvents; console.log('push old period2');}
			else if (req.body.period === 3) { game.period3 = gameEvents; console.log('push old period3');}
			else if (req.body.period === 4) { game.overTime = gameEvents; console.log('push old period4');}
			// Add the new entry
			if (igameEvents >= user.gameEvents.length) { user.gameEvents.push(game); }

			// Save the game events
			user.save( function (err, result) {
				if (err) { res.json(err); } 
				else { res.json(result); }
			});
		}
	});
};

module.exports.deleteGameEvents = function (req, res) {

};
