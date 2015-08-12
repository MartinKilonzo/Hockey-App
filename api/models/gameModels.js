'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (mongoose) {
	var GameEvent = new Schema({
		game			:		{ type: Number, required: true},
		eventId			: 		{ type: Number, required: true},
		players			:		{ type: [Number], required: true },
		period			:		{ type: Number, required: true },
		time			:		{ type: String, required: true },
		count			:		{ type: Number, required: true }
	});

	var GameTotal = new Schema({
		shotsOn			:		{ type: Number, required: true },
		shotsAgainst	:		{ type: Number, required: true },
		teamGoals		:		{ type: Number, required: true },
		opponentGoals	:		{ type: Number, required: true }
	});

	var period = {
		period1			: 		{ type: GameTotal },
		period2			: 		{ type: GameTotal },
		period3			: 		{ type: GameTotal },
		overTime		: 		{ type: GameTotal }
	};

	var Stats = new Schema({
		games			: 		{ type: [period] },
		players			: 		{ type: [period] },
		lineups			: 		{ type: [period] }
	});

	var models = {
		GameEvent 		:		mongoose.model('GameEvent', GameEvent),
		GameTotal 		:		mongoose.model('GameTotal', GameTotal),
		Stats 			:		mongoose.model('Stats', Stats)
	};

	return models;
};
