const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    """
    Character Reputations API

    Returns a summary of a character's reputations.
    """
    characterReputations(
      """
      The slug of the realm.
      """
      realm: String
      """
      The lowercase name of the character.
      """
      name: String
    ): CharacterReputationsResponse
  }

  type CharacterReputationsResponse {
    _links: Links
    character: Character
    reputations: [Reputation]
  }

  type Reputation {
    faction: KeyNameId
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
