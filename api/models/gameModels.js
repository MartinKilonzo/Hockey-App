'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (mongoose) {
	var GameEvent = {
		game			:		{ type: Number, required: true},
		eventId			: 		{ type: Number, required: true},
		players			:		{ type: [Number], required: true },
		period			:		{ type: Number, required: true },
		time			:		{ type: String, required: true },
		count			:		{ type: Number, required: true }
	};

	var GameEvents = new Schema({
		shotsOn			: 		{ type: [GameEvent] },
		shotsAgainst	: 		{ type: [GameEvent] },
		teamGoals		: 		{ type: [GameEvent] },
		opponentGoals	: 		{ type: [GameEvent] }
	});

	var GameTotal = {
		shotsOn			:		{ type: Number, required: true },
		shotsAgainst	:		{ type: Number, required: true },
		teamGoals		:		{ type: Number, required: true },
		opponentGoals	:		{ type: Number, required: true }
	};

	var GameTotals = new Schema({
		period1			: 		{ type: GameTotal },
		period2			: 		{ type: GameTotal },
		period3			: 		{ type: GameTotal },
		overTime		: 		{ type: GameTotal }
	});

	var models = {
		GameEvents 		:		mongoose.model('GameEvents', GameEvents),
		GameTotals 		:		mongoose.model('GameTotals', GameTotals),
	};

	return models;
};
