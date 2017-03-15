var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	created_at: Date
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
