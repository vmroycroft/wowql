const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    characters(player: String): [Character]
  }

  type Character {
    id: ID!
    name: String
  }
`;

module.exports = schemas;
