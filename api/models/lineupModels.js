'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (mongoose) {
	/*var Lineup = new Schema({
		lineupTitle		: 		{ type: String, required: true },
		leftWing		: 		{ type: Schema.ObjectId, ref: 'Player', required: true },
		center			: 		{ type: Schema.ObjectId, ref: 'Player', required: true },
		rightWing		: 		{ type: Schema.ObjectId, ref: 'Player', required: true },
		defence1		: 		{ type: Schema.ObjectId, ref: 'Player', required: true },
		defence2		: 		{ type: Schema.ObjectId, ref: 'Player', required: true }
	});*/

	var Lineup = new Schema ({
		lineupTitle		: 		{ type: String, required: true },
		leftWing		: 		{ type: Number, ref: 'Player', required: true },
		center			: 		{ type: Number, ref: 'Player', required: true },
		rightWing		: 		{ type: Number, ref: 'Player', required: true },
		defence1		: 		{ type: Number, ref: 'Player', required: true },
		defence2		: 		{ type: Number, ref: 'Player', required: true }
	});

	var models = { 
		Lineup		: 		mongoose.model('Lineup', Lineup) 
	};

	return models;
};
