module.exports = {
	Query: {
		characterProfile: async (_, { realm, name }, { dataSources, getUser }) => await dataSources.characterProfile.getCharacterProfile(realm, name, getUser)
	}
};
