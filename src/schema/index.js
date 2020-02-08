const { gql } = require("apollo-server"),
  characterEquipmentSchema = require("./character-equipment");

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, characterEquipmentSchema];
