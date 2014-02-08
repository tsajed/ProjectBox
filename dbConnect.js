
var mongoose = require('mongoose');

var uri = "mongodb://projectbox:projectbox1@ds027789.mongolab.com:27789/projectbox";

mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected");
});
