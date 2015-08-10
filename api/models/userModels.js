'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = mongoose.model('Player').schema;
var Lineup = mongoose.model('Lineup').schema;

module.exports = function (mongoose) {

	// var User = new Schema({
	// 	firstName		: 		{ type: String, required: true },
	// 	lastName		: 		{ type: String },
	// 	team			: 		{ type: String, required: true },
	// 	googleDrive		: 		{ type: String },
	// 	players			: 		{ type: [Player] },
	// 	lineups			: 		{ type: [Lineup] },
	// 	stats 			: 		{ 
	// 		players		: 		{ type: [GameTotal] },
	// 		lineups		: 		{ type: [GameTotal] },
	// 		games		: 		{ type: [GameTotal] }
	// 	}
	// });

	var User = new Schema({
		firstName		: 		{ type: String, required: true },
		lastName		: 		{ type: String },
		team			: 		{ type: String, required: true },
		googleDrive		: 		{ type: String },
		players			: 		{ type: [Player] },
		lineups			: 		{ type: [Lineup] }
	});
	var models = {
		User: mongoose.model('User', User, 'hockey')
	};
	return models; 
};
