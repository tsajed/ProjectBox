var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
	title  : String,
	author : String,
	rank   : Number
})