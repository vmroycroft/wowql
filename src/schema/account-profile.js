const { gql } = require('apollo-server-express');

const schemas = gql`
	extend type Query {
		"""
		Account Profile API

		Returns a profile summary for an account.

		Because this endpoint provides data about the current logged-in user's World of Warcraft account, it requires an access token with the wow.profile scope acquired via the Authorization Code Flow.
		"""
		accountProfile(
			"""
			The region fo the data to retrieve.
			"""
			region: String
			"""
			The namespace to use to locate this document.
			"""
			namespace: String
			"""
			The locale to reflect in localized data.
			"""
			locale: String
		): AccountProfileResponse
	}

	type AccountProfileResponse {
		battletag: String
		_links: Links
		id: Int
		wow_accounts: [WowAccount]
		collections: Key
	}

	type WowAccount {
		id: String
		characters: [AccountCharacter]
	}

	type AccountCharacter {
		character: Key
		protected_character: Key
		name: String
		id: Int
		realm: Realm
	}
`;

module.exports = schemas;
