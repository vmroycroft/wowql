require('dotenv').config();

const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;

const bnetOptions = {
		clientID: process.env.BNET_ID,
		clientSecret: process.env.BNET_SECRET,
		scope: 'wow.profile',
		callbackURL: 'http://localhost:4000/auth/bnet/callback'
	},
	bnetCallback = (accessToken, refreshToken, profile, done) => {
		console.log(`User token: ${accessToken}`);
		process.nextTick(() => {
			return done(null, profile);
		});
	};

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

passport.use(new BnetStrategy(bnetOptions, bnetCallback));

module.exports = passport;
