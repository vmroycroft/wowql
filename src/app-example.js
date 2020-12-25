require('dotenv').config();

var express = require('express');
var passport = require('passport');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var BnetStrategy = require('passport-bnet').Strategy;

var BNET_ID = process.env.BNET_ID;
var BNET_SECRET = process.env.BNET_SECRET;

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

// Use the BnetStrategy within Passport.
passport.use(
	new BnetStrategy(
		{
			clientID: BNET_ID,
			clientSecret: BNET_SECRET,
			scope: 'wow.profile sc2.profile',
			callbackURL: 'http://localhost:3000/auth/bnet/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			process.nextTick(function () {
				return done(null, profile);
			});
		}
	)
);

var app = express();

// configure Express
app.use(cookieParser());
app.use(session({ secret: 'blizzard', saveUninitialized: true, resave: true }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/bnet', passport.authenticate('bnet'));

app.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), function (req, res) {
	res.redirect('/');
});

app.get('/', function (req, res) {
	if (req.isAuthenticated()) {
		var output = '<h1>Express OAuth Test</h1>' + req.user.id + '<br>';
		if (req.user.battletag) {
			output += req.user.battletag + '<br>';
		}
		output += '<a href="/logout">Logout</a>';
		res.send(output);
	} else {
		res.send('<h1>Express OAuth Test</h1>' + '<a href="/auth/bnet">Login with Bnet</a>');
	}
});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

var server = app.listen(3000, function () {
	console.log('Listening on port %d', server.address().port);
});
