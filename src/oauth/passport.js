const passport = require('passport'),
	BnetStrategy = require('passport-bnet').Strategy;

const bnetOptions = {
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
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
