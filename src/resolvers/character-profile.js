module.exports = {
  Query: {
    characterProfile: async (_, { realm, name }, { dataSources }) =>
      await dataSources.characterProfile.getCharacterProfile(realm, name)
  }
};
