require("dotenv").config();

const { ApolloServer } = require("apollo-server"),
  typeDefs = require("./schema"),
  resolvers = require("./resolvers"),
  BlizzardApi = require("./BlizzardApi"),
  {
    CharacterProfile,
    CharacterEquipment,
    CharacterMedia,
    CharacterReputations
  } = require("./datasources");

const blizzardApi = new BlizzardApi(),
  dataSources = () => ({
    characterProfile: new CharacterProfile(blizzardApi),
    characterEquipment: new CharacterEquipment(blizzardApi),
    characterMedia: new CharacterMedia(blizzardApi),
    characterReputations: new CharacterReputations(blizzardApi)
  });

// start the app
init();

async function init() {
  // get the Blizzard application token
  await blizzardApi.getApplicationToken();

  // set up apollo server for graphql api requests
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}
