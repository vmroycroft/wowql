require("dotenv").config();

const express = require("express"),
  session = require("express-session"),
  uuid = require("uuid/v4"),
  cors = require("cors"),
  { ApolloServer } = require("apollo-server-express"),
  passport = require("passport"),
  BnetStrategy = require("passport-bnet").Strategy,
  BlizzardApi = require("./BlizzardApi"),
  typeDefs = require("./schema"),
  resolvers = require("./resolvers"),
  {
    AccountProfile,
    CharacterProfile,
    CharacterEquipment,
    CharacterMedia,
    CharacterReputations
  } = require("./datasources");

const app = express(),
  blizzardApi = new BlizzardApi(),
  bnetOptions = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: "wow.profile",
    callbackURL: "http://localhost:4000/auth/bnet/callback"
  },
  bnetCallback = (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    process.nextTick(() => {
      return done(null, profile);
    });
  },
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
    secret: "asdf",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/bnet", passport.authenticate("bnet"));
app.get(
  "/auth/bnet/callback",
  passport.authenticate("bnet", {
    successRedirect: "http://localhost:8080/#/home",
    failureRedirect: "http://localhost:8080/"
  })
);

app.get("/logout", function(req, res) {
  console.log(req.user);
  req.logout();
  console.log(req.user);
  // res.redirect("http://localhost:8080");
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new BnetStrategy(bnetOptions, bnetCallback));

// set up apollo server for graphql api requests
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => ({
    getUser: () => req.user
  }),
  playground: {
    settings: {
      "request.credentials": "same-origin"
    }
  }
});

server.applyMiddleware({ app, cors: false, path: "/api" });

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀  Server ready at http://localhost:${process.env.PORT}`);
});
