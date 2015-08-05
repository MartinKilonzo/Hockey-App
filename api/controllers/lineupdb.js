'use strict';

var mongoose = require('mongoose');
var lineupModels = require('../models/lineupModel.js')(mongoose);

module.exports.getLineups = function (req, res) {
	console.log('Fetching Lineups...\n');
	var query = lineupModels.Lineup.where({});
	query.find( function (err, result) {
		console.log(result);
		res.json(result);
	});
};

module.exports.create = function (req, res) {
	console.log('Creating...\n', req.body);
	var newLineup = new lineupModels.Lineup({ 	lineupTitle		: 		req.body.lineupTitle,
												leftWing		: 		req.body.leftWing,
												center			: 		req.body.center,
												rightWing		: 		req.body.rightWing,
												defence1		: 		req.body.defence1,
												defence2		: 		req.body.defence2 	});
	newLineup.save( function (err, result) {
		res.json(result);
	});
};

module.exports.modify = function (req, res) {
	console.log('Modifying...\n', req.body);
	var ObjectId = mongoose.Types.ObjectId;
	var query = lineupModels.Lineup.where({ _id: new ObjectId(req.params.oldLineup) });
	
	query.update({ name: req.body.name }, { players: req.body.players }, function (err, result) {
		res.json(result);
	});
};

module.exports.delete = function (req, res) {
	console.log('Deleting...\n', req.params);
	var ObjectId = mongoose.Types.ObjectId;
	var query = lineupModels.Lineup.where({ _id: new ObjectId(req.params.resourceId) });

	// Can use findOne() and Remove() seperately to store deleted data
	query.findOneAndRemove( function (err, result) {
		res.json(result);
	});
};
