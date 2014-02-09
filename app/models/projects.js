var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var projectSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  url: String,
  category: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  up: Number,
  down: Number,
  meta: {
    votes: Number,
    favs:  Number,
  }
});

module.exports = mongoose.model('Project', projectSchema);