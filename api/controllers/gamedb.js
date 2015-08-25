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
	var game;
	var i;

	User.findOne({ _id: new ObjectId(req.body.user) }, function (err, user) {
		if (err) { console.log('User not found.'); }
		else {

			// Find the existing entry for the game, if one exists. If not, initialize game
			for (var igameEvents = 0; igameEvents < user.gameEvents.length; igameEvents++) {
				if (user.gameEvents[igameEvents].game === req.body.game) { break; }
			}
			console.log('GameEvents from User: ', user.gameEvents);
			console.log('igameEvents: ', igameEvents, 'user.gameEvents.length', user.gameEvents.length);

			if (igameEvents < user.gameEvents.length) {
				if (req.body.period === 1 && user.gameEvents[igameEvents].period1) { game = user.gameEvents[igameEvents].period1; }
				else if (req.body.period === 2 && user.gameEvents[igameEvents].period2) { game = user.gameEvents[igameEvents].period2; }
				else if (req.body.period === 3 && user.gameEvents[igameEvents].period3) { game = user.gameEvents[igameEvents].period3; }
				else if (req.body.period === 4 && user.gameEvents[igameEvents].overTime) { game = user.gameEvents[igameEvents].overTime; }
				else { game = new gameModels.GameEvents(); }
			}

			else { game = new gameModels.GameEvents(); }
			console.log(game);

			// Assign game data
			for (i = 0; i < req.body.shotsOn.length; i++) {
				newGameEvent = new gameModels.GameEvent({	
					game		:		req.body.shotsOn[i].game,
					eventId		:		req.body.shotsOn[i].eventId,
					players		:		req.body.shotsOn[i].activePlayers,
					period		:		req.body.shotsOn[i].period,
					time		:		req.body.shotsOn[i].time,
					count		:		req.body.shotsOn[i].count
				});
				game.shotsOn.push(newGameEvent);
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
				game.shotsAgainst.push(newGameEvent);
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
				game.teamGoals.push(newGameEvent);
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
				game.opponentGoals.push(newGameEvent);
			}
			console.log('Finished opponentGoals:\t', i);
			console.info(game);

			// Add the new entry
			if (igameEvents >= user.gameEvents.length) {
				var obj = {		
					game 		: 		req.body.game,
					opponent 	: 		req.body.opponent,
					home 		: 		req.body.home,
					location 	: 		req.body.location
				};
				console.log(obj);
				if (req.body.period === 1) { obj.period1 = game; }
				if (req.body.period === 2) { obj.period2 = game; }
				if (req.body.period === 3) { obj.period3 = game; }
				if (req.body.period === 4) { obj.overTime = game; }

				user.gameEvents.push(obj);
			}

			user.save( function (err, result) {
				if (err) { res.json(err); } 
				else { res.json(result); }
			});
		}
	});
};

module.exports.deleteGameEvents = function (req, res) {

};
