var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var Chat = new Schema({
  created: Date,
  content: String,
  username: String,
  room: String

});

Chat.plugin(passportLocalMongoose);

module.exports = mongoose.model('Chat', Chat);
