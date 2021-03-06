require('dotenv').config();

const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const uuid = require('uuid/v4');
const cors = require('cors');
const passport = require('./oauth/passport');
const OauthClient = require('./oauth/client');
const BlizzardApi = require('./BlizzardApi');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const {
	AccountProfile,
	CharacterProfile,
	CharacterEquipment,
	CharacterMedia,
	CharacterReputations
} = require('./datasources');

const redisSessionStore = new RedisStore({
	client: redis.createClient({
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT
		// password: process.env.REDIS_PASSWORD
	})
});

const app = express();
const oauthClient = new OauthClient();
const blizzardApi = new BlizzardApi();

const dataSources = () => ({
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
		genid: (req) => uuid(),
		secret: 'asdf',
		resave: false,
		saveUninitialized: false,
		store: redisSessionStore
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/bnet', passport.authenticate('bnet'));

app.get(
	'/auth/bnet/callback',
	passport.authenticate('bnet', {
		// TODO pass redirect urls from client
		successRedirect: process.env.OAUTH_SUCCESS_REDIRECT,
		failureRedirect: process.env.OAUTH_FAILURE_REDIRECT
	})
);

app.get('/logout', function (req, res) {
	req.logout();
	// TODO end session on client
});

init();

async function init() {
	const appToken = await oauthClient.getToken();
	const appUser = { token: appToken };

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
		console.log(`🚀  Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
	});
}
