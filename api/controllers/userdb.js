'use strict';
var mongoose = require('mongoose');
var userModels = require('../models/userModels.js')(mongoose);

module.exports.getUser = function (req, res) {
	console.log('Fetching...\n', req.params);
	var ObjectId = mongoose.Types.ObjectId;
	userModels.User.findOne({ team: req.params.userId }, function (err, result) {
		if (!err) {
			//console.log('Fetched...\n', result);
			res.json(result);
		}
	});

};

module.exports.create = function (req, res) {
	console.log('Creating...\n', req.body);
	var user = new userModels.User({ 	
		firstName: 	req.body.firstName,
		lastName: 	req.body.lastName,
		team: 		req.body.team
	});
	user.save( function (err, result) {
		if (err) { res.json(err); } 
		else res.json(result);
	});
};
