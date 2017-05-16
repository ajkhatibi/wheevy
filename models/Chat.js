var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

	var MessageSchema = mongoose.Schema({
	  id: String,
	  channelID: String,
	  text: String,
	  user: Object,
	  time: String
	});

MessageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Chat', MessageSchema);
