'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (mongoose) {
	var Player = mongoose.model.Player.schema;
	var Lineup = mongoose.model.Lineup.schema;
	var GameTotal = mongoose.model.GameTotal.schema;

	var User = new Schema({
		firstName		: 		{ type: String },
		lastName		: 		{ type: String },
		googleDrive		: 		{ type: [String] },
		players			: 		{ type: [Player] },
		lineups			: 		{ type: [Lineup] },
		stats 			: 		{ 
			players		: 		{ type: [GameTotal] },
			lineups		: 		{ type: [GameTotal] },
			games		: 		{ type: [GameTotal] }
		}
	});

	return mongoose.model('User', User);
};
