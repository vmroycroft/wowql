require('dotenv').config();

const express = require('express'),
	session = require('express-session'),
	uuid = require('uuid/v4'),
	cors = require('cors'),
	passport = require('./oauth/passport'),
	OauthClient = require('./oauth/client'),
	BlizzardApi = require('./BlizzardApi'),
	{ ApolloServer } = require('apollo-server-express'),
	typeDefs = require('./schema'),
	resolvers = require('./resolvers'),
	{ AccountProfile, CharacterProfile, CharacterEquipment, CharacterMedia, CharacterReputations } = require('./datasources');

const app = express(),
	oauthClient = new OauthClient(),
	blizzardApi = new BlizzardApi(),
	dataSources = () => ({
		accountProfile: new AccountProfile(blizzardApi),
		characterProfile: new CharacterProfile(blizzardApi),
		characterEquipment: new CharacterEquipment(blizzardApi),
		characterMedia: new CharacterMedia(blizzardApi),
		characterReputations: new CharacterReputations(blizzardApi)
	});

app.use(
	cors({
		credentials: true,
		origin: true
	})
);
app.use(
	session({
		genid: req => uuid(),
		secret: 'asdf',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/bnet', passport.authenticate('bnet'));
app.get(
	'/auth/bnet/callback',
	passport.authenticate('bnet', {
		successRedirect: 'http://localhost:8080/#/home',
		failureRedirect: 'http://localhost:8080/'
	})
);

app.get('/logout', function(req, res) {
	req.logout();
	// req.session.destroy();
	// res.redirect("http://localhost:8080");
});

init();

async function init() {
	const appToken = await oauthClient.getToken();
	const appUser = { token: appToken };

	// set up apollo server for graphql api requests
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		dataSources,
		context: ({ req }) => ({
			getUser: () => req.user || appUser
		}),
		playground: {
			settings: {
				'request.credentials': 'same-origin'
			}
		}
	});

	server.applyMiddleware({ app, cors: false, path: '/api' });

	app.listen({ port: process.env.PORT }, () => {
		console.log(`🚀  Server ready at http://localhost:${process.env.PORT}`);
	});
}
