var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	gender: {type: String, required: true},
	password: { type: String, required: true },
	created_at: Date,
	lastActivity: Date,
	location: {
		coordinates: {
			type: [Number],
			index: {
				type: '2dsphere',
				sparse: true}
			}
		}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
