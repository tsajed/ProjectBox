// server.js for ProjectBox

var express = require('express');
var app = express(); 
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var database = require('./config/database'); 

mongoose.connect(database.url);

app.configure(function() {
	app.use(express.static('./public'));
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
});		

require('./app/routes.js')(app);

app.listen(port);