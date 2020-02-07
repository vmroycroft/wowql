const { gql } = require('apollo-server');

const schemas = gql`
	extend type Query {
		administrations(date: String): [Administration]
	}

	extend type Mutation {
		addAdministration(poodle: String, date: String, scheduledTime: String, administeredTime: String): AddAdministrationResponse
		removeAdministration(poodle: String, date: String, scheduledTime: String): RemoveAdministrationResponse
		updateAdministration(poodle: String, date: String, scheduledTime: String, administeredTime: String): UpdateAdministrationResponse
	}

	type Administration {
		id: ID!
		poodle: String
		date: String
		scheduledTime: String
		administeredTime: String
	}

	type AddAdministrationResponse {
		success: Boolean
		message: String
		administration: Administration
	}

	type RemoveAdministrationResponse {
		success: Boolean
		message: String
		deletedCount: Int
	}

	type UpdateAdministrationResponse {
		success: Boolean
		message: String
		updatedCount: Int
	}
`;

module.exports = schemas;
