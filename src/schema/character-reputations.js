const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    characterReputations(
      realm: String
      name: String
    ): CharacterReputationsResponse
  }

  type CharacterReputationsResponse {
    _links: Links
    character: Character
    reputations: [Reputation]
  }

  type Reputation {
    faction: ItemClass
    standing: Standing
  }

  type Standing {
    raw: Int
    value: Int
    max: Int
    tier: Int
    name: String
  }
`;

module.exports = schemas;
