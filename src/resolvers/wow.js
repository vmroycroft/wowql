module.exports = {
  Query: {
    characters: async (_, { player }, { dataSources }) =>
      dataSources.wowApi.getCharacters({ player })
  }
};
