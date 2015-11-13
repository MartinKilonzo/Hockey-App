'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (mongoose) {
	/*var line = new Schema({
		lineTitle		: 		{ type: String, required: true },
		leftWing		: 		{ type: Schema.ObjectId, ref: 'Player', required: true },
		center			: 		{ type: Schema.ObjectId, ref: 'Player', required: true },
		rightWing		: 		{ type: Schema.ObjectId, ref: 'Player', required: true },
		defence1		: 		{ type: Schema.ObjectId, ref: 'Player', required: true },
		defence2		: 		{ type: Schema.ObjectId, ref: 'Player', required: true }
	});*/

	var line = new Schema ({
		lineTitle		: 		{ type: String, required: true },
		lineType 		: 		{ type: Number, required: true },
		players 		: 		{ type: [Number], ref: 'Players' }
	});

	var models = { 
		Line			: 		mongoose.model('Line', line) 
	};

	return models;
};
