'use strict';
var mongoose = require('mongoose');
var gameModels = require('../models/gameModels.js')(mongoose);

module.exports.getPlayers = function (req, res) {
	console.log('Fetching players...\n');
	var query = gameModels.Player.where({});
	query.find( function (err, result) {
		console.log(result);
		res.json(result);
	});
};

module.exports.create = function (req, res) {
	console.log('Creating...\n', req.body);
	var newPlayer = new gameModels.Player({	firstName: req.body.firstName,
											    lastName: req.body.lastName,
											    playerNumber: req.body.playerNumber,
											    position: req.body.position,
											    games: req.body.games				});

	newPlayer.save( function (err, result) {
		res.json(result);
	});
};

module.exports.delete = function (req, res) {
	console.log('Deleting...\n', req.params);
	var ObjectId = mongoose.Types.ObjectId;
	var query = gameModels.Player.where({ _id: new ObjectId(req.params.resourceId) });

	// Can use findOne() and Remove() seperately to store deleted data
	query.findOneAndRemove( function (err, result) {
		res.json(result);
	});
};