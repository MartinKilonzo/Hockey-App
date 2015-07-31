'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (mongoose) {
	var Player = mongoose.model.Player.schema;

	var Lineup = new Schema({
		players: { type: [Player], required: true }
	});

	return mongoose.model('Lineup', Lineup);
};