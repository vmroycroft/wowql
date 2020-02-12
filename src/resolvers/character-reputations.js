module.exports = {
  Query: {
    characterReputations: async (_, { realm, name }, { dataSources }) =>
      await dataSources.characterReputations.getCharacterReputations(
        realm,
        name
      )
  }
};
