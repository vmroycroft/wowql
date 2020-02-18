module.exports = {
  Query: {
    characterMedia: async (_, { realm, name }, { dataSources, getUser }) =>
      await dataSources.characterMedia.getCharacterMedia(realm, name, getUser)
  }
};
