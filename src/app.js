const { ApolloServer } = require("apollo-server"),
  typeDefs = require("./schema"),
  resolvers = require("./resolvers/wow"),
  // resolvers = require("./resolvers"),
  { PoodlesApi, WowApi } = require("./datasources");

// set up mongodb connection
// require('./dbconfig.js');

// get the Blizzard application token
getBlizzardToken();

async function getBlizzardToken() {
  const blizzardToken = await require("./wowApiConfig");

  // set up apollo server for graphql api requests
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      poodlesApi: new PoodlesApi(),
      wowApi: new WowApi(blizzardToken)
    })
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}
