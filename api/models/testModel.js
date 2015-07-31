var mongoose = require('mongoose');

 module.exports = mongoose.model('Test', {
 	message: { type: String, required: true }
 });