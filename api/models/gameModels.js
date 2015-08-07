'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (mongoose) {
	var GameEvent = new Schema({
		game			:		{ type: Number, required: true},
		eventId			:		{ type: Number, required: true},
		players			:		{ type: [Number], required: true },
		period			:		{ type: Number, required: true },
		time			:		{ type: String, required: true },
		stat 			:		{ type: String, required: true },
		count			:		{ type: Number, required: true }
	});

	var GameTotal = new Schema({
		shotsOn			:		{ type: Number, required: true },
		shotsAgainst	:		{ type: Number, required: true },
		teamGoals		:		{ type: Number, required: true },
		opponentGoals	:		{ type: Number, required: true }
	});

	var Game = new Schema({
		gameEvents		:		{ type: [GameEvent], required: true },
		gameTotals		:		{ type: [GameTotal], required: true }
	});

	var models = {
		GameEvent 		:		mongoose.model('GameEvent', GameEvent),
		GameTotal 		:		mongoose.model('GameTotal', GameTotal),
		Game 			:		mongoose.model('Game', Game)
	};

	return models;
};
