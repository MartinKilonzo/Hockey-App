'use strict';

var mongoose = require('mongoose');
var lineupModels = require('../models/lineupModels.js')(mongoose);

// Depreciated
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
	var ObjectId = mongoose.Types.ObjectId;
	var newLineup = new lineupModels.Lineup({ 	
		lineupTitle		: 		req.body.lineupTitle,
		leftWing		: 		req.body.leftWing,
		center			: 		req.body.center,
		rightWing		: 		req.body.rightWing,
		defence1		: 		req.body.defence1,
		defence2		: 		req.body.defence2
	});
	
	mongoose.model('User').findOne({ _id: new ObjectId(req.body.user) }, function (err, user) {
		user.lineups.push(newLineup);
		user.save( function (err, result) {
			if (err) { res.json(err); } 
			else { res.json(result); }
		});
	});
};

module.exports.modify = function (req, res) {
	console.log('Modifying...\n', req.body);
	var ObjectId = mongoose.Types.ObjectId;
	var User = mongoose.model('User');

	User.findById(new ObjectId(req.body.user), function (err, user) {
		if (err) { res.json(err); } 
		else {
			var lineup = user.lineups.id(req.body.oldLineup);
			lineup.lineupTitle	=	req.body.lineupTitle;
			lineup.leftWing		=	req.body.leftWing;
			lineup.center		=	req.body.center;
			lineup.rightWing	=	req.body.rightWing;
			lineup.defence1		=	req.body.defence1;
			lineup.defence2		=	req.body.defence2;
			user.save( function (err, result) {
				if (err) { res.json(err); } 
				else res.json(result);
			});
		}		
	});
};

module.exports.delete = function (req, res) {
	console.log('Deleting...\n', req.params);
	var ObjectId = mongoose.Types.ObjectId;
	var User = mongoose.model('User');

	User.findById(new ObjectId(req.params.userId), function (err, user) {
		if (err) { res.json(err); } 
		else {
			user.lineups.id(req.params.resourceId).remove();
			user.save( function (err, result) {
				if (err) { res.json(err); } 
				else res.json(result);
			});
		}		
	});
};
