var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  title:  String,
  firstname: String,
  lastname:   String,
  projects: [String],
  hidden: Boolean,
  meta: {
    avvotes: Number,
    favs:  Number
  }
});

module.exports = mongoose.model('User', userSchema);