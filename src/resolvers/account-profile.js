module.exports = {
	Query: {
		accountProfile: async (_, { region, namespace, locale }, { dataSources, getUser }) => await dataSources.accountProfile.getAccountProfile(region, namespace, locale, getUser)
	}
};
