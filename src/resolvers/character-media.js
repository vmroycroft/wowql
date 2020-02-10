module.exports = {
  Query: {
    characterMedia: async (_, { realm, name }, { dataSources }) =>
      await dataSources.characterMedia.getCharacterMedia(realm, name)
  }
};
