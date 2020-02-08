const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    characterEquipment(realm: String, name: String): [EquippedItem]
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
    media: ItemData
    item_class: ItemClass
    item_subclass: ItemClass
    inventory_type: EquippedItemDefinition
    binding: EquippedItemDefinition
    armor: EquippedItemArmor
    stats: [EquippedItemStat]
    sell_price: EquippedItemSellPrice
    level: EquippedItemLevel
    durability: EquippedItemLevel
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

  type EquippedItemArmor {
    value: Int
    display: EquippedItemDisplay
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
