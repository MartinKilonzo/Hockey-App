'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (mongoose) {
	var GameEvent = new Schema({
		players			: 		{ required: true },
		period			: 		{ type: Number, required: true },
		time			: 		{ type: String, required: true },
		stat 			: 		{ type: String, required: true },
		count			: 		{ required: true }
	});

	var GameTotal = new Schema({
		shotsOn			: 		{ type: Number, required: true },
		shotsAgainst	: 		{ type: Number, required: true },
		teamGoals		: 		{ type: Number, required: true },
		opponentGoals	: 		{ type: Number, required: true }
	});

	var Game = new Schema({
		gameEvents		: 		{ type: [GameEvent], required: true },
		gameTotals		: 		{ type: [GameTotal], required: true }
	});

	var Player = new Schema({
		number 			: 		{ type: Number, required: true },
		position		: 		{ type: String, required: true },
		firstName		: 		{ type: String, required: true },
		lastName		: 		{ type: String, required: true },
	 	games 			: 		{ type: [Game], required: true }
	 });

	var models = {
		GameEvent 		: 		mongoose.model('GameEvent', GameEvent),
		GameTotal 		: 		mongoose.model('GameTotal', GameTotal),
		Game 			: 		mongoose.model('Game', Game),
		Player 			: 		mongoose.model('Player', Player)
	};

	return models;
};
