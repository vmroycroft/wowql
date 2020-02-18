module.exports = {
  Query: {
    characterEquipment: async (_, { realm, name }, { dataSources, getUser }) =>
      await dataSources.characterEquipment.getCharacterEquipment(
        realm,
        name,
        getUser
      )
  }
};
