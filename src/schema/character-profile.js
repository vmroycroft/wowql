const { gql } = require('apollo-server-express');

const schemas = gql`
	extend type Query {
		"""
		Character Profile API

		Returns a profile summary for a character.
		"""
		characterProfile(
			"""
			The slug of the realm.
			"""
			realm: String
			"""
			The lowercase name of the character.
			"""
			name: String
		): CharacterProfileResponse
	}

	type CharacterProfileResponse {
		_links: Links
		id: Int
		name: String
		gender: TypeName
		faction: TypeName
		race: KeyNameId
		character_class: KeyNameId
		active_spec: KeyNameId
		realm: Realm
		level: Int
		experience: Int
		achievement_points: Int
		achievements: Key
		titles: Key
		pvp_summary: Key
		raid_progression: Key
		media: Key
		hunter_pets: Key
		last_login_timestamp: Int
		average_item_level: Int
		equipped_item_level: Int
		specializations: Key
		statistics: Key
		mythic_keystone_profile: Key
		equipment: Key
		appearance: Key
		collections: Key
		reputations: Key
		quests: Key
	}
`;

module.exports = schemas;
