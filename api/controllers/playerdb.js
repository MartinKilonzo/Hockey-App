'use strict';
var mongoose = require('mongoose');
var playerModels = require('../models/playerModel.js')(mongoose);
var Player = playerModels.player;

module.exports.getPlayers = function (req, res) {
	console.log('Fetching players...');
	var query = playerModels.Player.where({});
	query.find( function (err, result) {
		console.log(result);
		res.json(result);
	});
	
};

module.exports.create = function (req, res) {
	console.log('Creating...', req.body);
	var newPlayer = new playerModels.Player({	firstName: req.body.firstName,
										    lastName: req.body.lastName,
										    playerNumber: req.body.playerNumber,
										    position: req.body.position,
										    games: req.body.games			});

	newPlayer.save( function (err, result) {
		res.json(result);
	});
};

module.exports.delete = function (req, res) {
	console.log('Deleting...', req.params);
	var ObjectId = mongoose.Types.ObjectId;
	var query = playerModels.Player.where({ _id: new ObjectId(req.params.resourceId) });

	// Can use findOne() and Remove() seperately to store deleted data
	query.findOneAndRemove( function (err, result) {
		res.json(result);
	});
};