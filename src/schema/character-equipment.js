const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    characterEquipment(realm: String, name: String): CharacterEquipmentResponse
  }

  type CharacterEquipmentResponse {
    _links: Links
    character: Character
    equipped_items: [EquippedItem]
  }

  type Links {
    self: ItemDataKey
  }

  type Character {
    key: ItemDataKey
    name: String
    id: Int
    realm: Realm
  }

  type Realm {
    key: ItemDataKey
    name: String
    id: Int
    slug: String
  }

  type EquippedItem {
    item: ItemData
    slot: EquippedItemDefinition
    quantity: Int
    context: Int
    bonus_list: [Int]
    timewalker_level: Int
    quality: EquippedItemDefinition
    name: String
    modified_appearance_id: Int
    azerite_details: AzeriteDetails
    media: ItemData
    item_class: ItemClass
    item_subclass: ItemClass
    inventory_type: EquippedItemDefinition
    binding: EquippedItemDefinition
    armor: EquippedItemArmor
    weapon: Weapon
    unique_equipped: String
    stats: [EquippedItemStat]
    spells: [SpellTooltip]
    requirements: Requirements
    description: String
    sell_price: EquippedItemSellPrice
    level: EquippedItemLevel
    is_subclass_hidden: Boolean
    transmog: Transmog
    durability: EquippedItemLevel
    name_description: EquippedItemDisplay
  }

  type ItemData {
    key: ItemDataKey
    id: Int
  }

  type ItemClass {
    key: ItemDataKey
    name: String
    id: Int
  }

  type ItemDataKey {
    href: String
  }

  type EquippedItemDefinition {
    type: String
    name: String
  }

  type AzeriteDetails {
    percentage_to_next_level: Float
    selected_essences: [SelectedEssence]
    level: EquippedItemLevel
    selected_powers: [SelectedPower]
    selected_powers_string: String
  }

  type SelectedEssence {
    slot: Int
    rank: Int
    main_spell_tooltip: SpellTooltip
    passive_spell_tooltip: SpellTooltip
    essence: ItemClass
    media: ItemData
  }

  type SelectedPower {
    id: Int
    tier: Int
    spell_tooltip: SpellTooltip
    is_display_hidden: Boolean
  }

  type SpellTooltip {
    spell: ItemClass
    description: String
    cast_time: String
    range: String
  }

  type EquippedItemArmor {
    value: Int
    display: EquippedItemDisplay
  }

  type Weapon {
    damage: Damage
    attack_speed: EquippedItemLevel
    dps: EquippedItemLevel
  }

  type Damage {
    min_value: Int
    max_value: Int
    display_string: String
    damage_class: EquippedItemDefinition
  }

  type EquippedItemDisplay {
    display_string: String
    color: ItemColor
  }

  type ItemColor {
    r: Int
    g: Int
    b: Int
    a: Int
  }

  type EquippedItemStat {
    type: EquippedItemDefinition
    value: Int
    is_equip_bonus: Boolean
    is_negated: Boolean
    display: EquippedItemDisplay
  }

  type Requirements {
    level: EquippedItemLevel
  }

  type Transmog {
    item: ItemClass
    display_string: String
    item_modified_appearance_id: Int
  }

  type EquippedItemSellPrice {
    value: Int
    display_strings: SellPriceDisplayStrings
  }

  type SellPriceDisplayStrings {
    header: String
    gold: String
    silver: String
    copper: String
  }

  type EquippedItemLevel {
    value: Int
    display_string: String
  }
`;

module.exports = schemas;
