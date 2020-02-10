const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    characterProfile(realm: String, name: String): CharacterProfileResponse
  }

  type CharacterProfileResponse {
    _links: Links
    id: Int
    name: String
    gender: EquippedItemDefinition
    faction: EquippedItemDefinition
    race: ItemClass
    character_class: ItemClass
    active_spec: ItemClass
    realm: Realm
    level: Int
    experience: Int
    achievement_points: Int
    achievements: ItemDataKey
    titles: ItemDataKey
    pvp_summary: ItemDataKey
    raid_progression: ItemDataKey
    media: ItemDataKey
    hunter_pets: ItemDataKey
    last_login_timestamp: Int
    average_item_level: Int
    equipped_item_level: Int
    specializations: ItemDataKey
    statistics: ItemDataKey
    mythic_keystone_profile: ItemDataKey
    equipment: ItemDataKey
    appearance: ItemDataKey
    collections: ItemDataKey
    reputations: ItemDataKey
    quests: ItemDataKey
  }
`;

module.exports = schemas;
