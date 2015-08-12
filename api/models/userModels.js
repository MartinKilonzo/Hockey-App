'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = mongoose.model('Player').schema;
var Lineup = mongoose.model('Lineup').schema;
var GameEvent = mongoose.model('GameEvent').schema;
var GameTotal = mongoose.model('GameTotal').schema;
var Stats = mongoose.model('Stats').schema;

module.exports = function (mongoose) {

	var game = {
		shotsOn			: 		{ type: [GameEvent] },
		shotsAgainst	: 		{ type: [GameEvent] },
		teamGoals		: 		{ type: [GameEvent] },
		opponentGoals	: 		{ type: [GameEvent] }
	};

	var User = new Schema({
		firstName		: 		{ type: String, required: true },
		lastName		: 		{ type: String },
		team			: 		{ type: String, required: true },
		googleDrive		: 		{ type: String },
		players			: 		{ type: [Player] },
		lineups			: 		{ type: [Lineup] },
		gameEvents		: 		{ type: [game] },
		stats 			: 		{ type: Stats }
	});
	var models = {
		User: mongoose.model('User', User, 'hockey')
	};
	return models; 
};
