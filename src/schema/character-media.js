const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    """
    Character Media API

    Returns a summary of the media assets available for a character (such as an avatar render).
    """
    characterMedia(
      """
      The slug of the realm.
      """
      realm: String
      """
      The lowercase name of the character.
      """
      name: String
    ): CharacterMediaResponse
  }

  type CharacterMediaResponse {
    _links: Links
    character: Character
    avatar_url: String
    bust_url: String
    render_url: String
  }
`;

module.exports = schemas;
