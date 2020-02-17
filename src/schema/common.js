const { gql } = require('apollo-server-express');

const schemas = gql`
	type Links {
		self: Key
	}

	type Character {
		key: Key
		name: String
		id: Int
		realm: Realm
	}

	type Realm {
		key: Key
		name: String
		id: Int
		slug: String
	}

	type KeyNameId {
		key: Key
		name: String
		id: Int
	}

	type Key {
		href: String
	}

	type TypeName {
		type: String
		name: String
	}
`;

module.exports = schemas;
