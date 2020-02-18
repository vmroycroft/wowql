module.exports = {
  Query: {
    characterReputations: async (
      _,
      { realm, name },
      { dataSources, getUser }
    ) =>
      await dataSources.characterReputations.getCharacterReputations(
        realm,
        name,
        getUser
      )
  }
};
