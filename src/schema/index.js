const { gql } = require("apollo-server"),
  characterEquipmentSchema = require("./character-equipment"),
  characterProfileSchema = require("./character-profile");
characterMediaSchema = require("./character-media");

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [
  linkSchema,
  characterEquipmentSchema,
  characterProfileSchema,
  characterMediaSchema
];
