module.exports = {
  Query: {
    characterEquipment: async (_, { realm, name }, { dataSources }) =>
      await dataSources.characterEquipment.getCharacterEquipment(realm, name)
  }
};
