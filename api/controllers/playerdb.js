'use strict';
var mongoose = require('mongoose');
var playerModels = require('../models/playerModels.js')(mongoose);
var ObjectId = mongoose.Types.ObjectId;

// Depreciated.
module.exports.getPlayers = function (req, res) {
	console.log('Fetching players...\n');
	var query = playerModels.Player.where({});
	query.find( function (err, result) {
		console.log(result);
		res.json(result);
	});
};

module.exports.create = function (req, res) {
	console.log('Creating...\n', req.body);
	var User = mongoose.model('User');

	var newPlayer = new playerModels.Player({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		playerNumber: req.body.playerNumber,
		position: req.body.position,
		games: req.body.games
	});

	User.findOne({ _id: new ObjectId(req.body.user) }, function (err, user) {
		user.players.push(newPlayer);
		user.save( function (err, result) {
			if (err) { res.json(err); } 
			else res.json(result);
		});
	});
};

module.exports.delete = function (req, res) {
	console.log('Deleting...\n', req.params);
	var User = mongoose.model('User');

	User.findById(new ObjectId(req.params.userId), function (err, user) {
		if (err) { res.json(err); } 
		else {
			user.players.id(req.params.resourceId).remove();
			user.save( function (err, result) {
				if (err) { res.json(err); } 
				else res.json(result);
			});
		}		
	});
};