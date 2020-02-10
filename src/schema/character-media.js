const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    characterMedia(realm: String, name: String): CharacterMediaResponse
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
