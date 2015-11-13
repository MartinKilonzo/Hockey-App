'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = mongoose.model('Player').schema;
var Line = mongoose.model('Line').schema;
var Game = mongoose.model('Game').schema;
var GameTotals = mongoose.model('GameTotals').schema;

module.exports = function (mongoose) {

	var User = new Schema({
		firstName		: 		{ type: String, required: true },
		lastName		: 		{ type: String },
		team			: 		{ type: String, required: true },
		googleDrive		: 		{ type: String },
		players			: 		{ type: [Player] },
		lines			: 		{
			offence 	: 			{ type: [Line] },
			defence 	: 			{ type: [Line] }
		},
		gameEvents		: 		{ type: [Game] },
		stats 			: 		{ 
			games			: 		{ type: [GameTotals] },
			players			: 		{ type: [GameTotals] },
			lines			: 		{ type: [GameTotals] }
		}
	});
	var models = {
		User: mongoose.model('User', User, 'hockey')
	};
	return models; 
};
