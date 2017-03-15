let express = require('express');
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let passport = require('passport');
let cookieParser = require('cookie-parser');

let bodyParser = require('body-parser');
let app = express();

// Initializing MongoDB with Mongoose
let db = mongoose.connection;
//mongodb://localhost/wheevydb
// mongodb://heroku_tjswj88f:c1f0stlho2364lqan95qde7bhf@ds149998.mlab.com:49998/heroku_tjswj88f
mongoose.connect('mongodb://localhost/wheevydb');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
	console.log('ayyy Buddy connected to wheevydb');
});

///cookie-parser middleware
app.use(cookieParser())
///body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

///requring searchUsers_routes.js
require('./server/searchUser_route.js')(app);

// passport config
var Users = require('./models/Users');
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

//configure for passpoort from previous attempt
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./server/passport_route.js')(app);
// Serve application file depending on environment
app.get('/app.js', (req, res) => {
	if (process.env.PRODUCTION) {
		res.sendFile(__dirname + '/build/app.js');
	} else {
		res.redirect('//localhost:9090/build/app.js');
	}
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
	if (process.env.PRODUCTION) {
		res.sendFile(__dirname + '/build/style.css');
	} else {
		res.redirect('//localhost:9090/build/style.css');
	}
});

app.use(express.static(__dirname + '/build'));

// Serve index page
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/build/index.html');
});

app.post('/landing', (req, res) => {
	res.json({
		title: 'Landing Page'
	});
});

app.post('/home', (req, res) => {
	res.json({
		title: 'Home Page'
	});
});


/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
	var webpack = require('webpack');
	var WebpackDevServer = require('webpack-dev-server');
	var config = require('./webpack.local.config');

	new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: true,
		noInfo: true,
		historyApiFallback: true
	}).listen(9090, 'localhost', (err, result) => {
		if (err) {
			console.log(err);
		}
	});
}


/******************
 *
 * Express server
 *
 *****************/

var port = process.env.PORT || 8080;
var server = app.listen(port, () => {
	var host = server.address().address;
	port = server.address().port;

	console.log('Essential React listening at http://%s:%s', host, port);
});
