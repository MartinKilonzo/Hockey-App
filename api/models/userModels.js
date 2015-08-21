'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = mongoose.model('Player').schema;
var Lineup = mongoose.model('Lineup').schema;
var Game = mongoose.model('Game').schema;
var GameTotals = mongoose.model('GameTotals').schema;

module.exports = function (mongoose) {

	var User = new Schema({
		firstName		: 		{ type: String, required: true },
		lastName		: 		{ type: String },
		team			: 		{ type: String, required: true },
		googleDrive		: 		{ type: String },
		players			: 		{ type: [Player] },
		lineups			: 		{ type: [Lineup] },
		gameEvents		: 		{ type: [Game] },
		stats 			: 		{ 
			games			: 		{ type: [GameTotals] },
			players			: 		{ type: [GameTotals] },
			lineups			: 		{ type: [GameTotals] }
		}
	});
	var models = {
		User: mongoose.model('User', User, 'hockey')
	};
	return models; 
};
