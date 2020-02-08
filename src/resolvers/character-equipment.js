module.exports = {
  Query: {
    characterEquipment: async (_, { realm, name }, { dataSources }) =>
      dataSources.characterEquipment.getCharacterEquipment(realm, name)
  }
};
