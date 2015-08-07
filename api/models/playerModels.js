'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

	var Player = new Schema({
		playerNumber	:		{ type: Number },
		position		:		{ type: String },
		firstName		:		{ type: String },
		lastName		:		{ type: String },
	 	games 			:		{ type: [Schema.Types.ObjectId] }
	 });

	var models = {
		Player 			:		mongoose.model('Player', Player)
	};

	return models;
};