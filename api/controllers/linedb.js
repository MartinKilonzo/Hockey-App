'use strict';

var mongoose = require('mongoose');
var lineModels = require('../models/lineModels.js')(mongoose);
var ObjectId = mongoose.Types.ObjectId;

var lineTypes = ['offence', 'defence'];

// Depreciated
module.exports.getLines = function (req, res) {
	console.log('Fetching Lines...\n');
	var query = lineModels.Line.where({});
	query.find( function (err, result) {
		console.log(result);
		res.json(result);
	});
};

module.exports.create = function (req, res) {
	console.log('Creating...\n', req.body);
	var User = mongoose.model('User');
	var newLine = new lineModels.Line({ 	
		lineTitle		: 		req.body.lineTitle,
		lineType		: 		req.body.lineType,
		players 		: 		req.body.players
	});
	console.log('newLine:', newLine);
	User.findOne({ _id: new ObjectId(req.body.user) }, function (err, user) {
		user.lines[lineTypes[newLine.lineType]].push(newLine);
		user.save( function (err, result) {
			if (err) { res.json(err); } 
			else { res.json(result); }
		});
	});
};

module.exports.modify = function (req, res) {
	console.log('Modifying...\n', req.body);
	var User = mongoose.model('User');

	User.findById(new ObjectId(req.body.user), function (err, user) {
		if (err) { res.json(err); } 
		else {
			var line = user.lines[lineTypes[req.body.lineType]].id(req.body.oldLine);
			line.lineTitle	=	req.body.lineTitle;
			line.lineType	=	req.body.lineType;
			line.players	=	req.body.players;
			user.save( function (err, result) {
				if (err) { res.json(err); } 
				else res.json(result);
			});
		}		
	});
};

module.exports.delete = function (req, res) {
	console.log('Deleting...\n', req.params);
	var User = mongoose.model('User');

	User.findById(new ObjectId(req.params.userId), function (err, user) {
		if (err) { res.json(err); } 
		else {
			console.log(lineTypes[parseInt(req.params.lineType)]);
			user.lines[lineTypes[parseInt(req.params.lineType)]].id(req.params.resourceId).remove();
			user.save( function (err, result) {
				if (err) { res.json(err); } 
				else res.json(result);
			});
		}		
	});
};
