const { gql } = require("apollo-server"),
  commonSchema = require("./common"),
  oauth2Schema = require("./oauth2"),
  characterEquipmentSchema = require("./character-equipment"),
  characterProfileSchema = require("./character-profile"),
  characterMediaSchema = require("./character-media"),
  characterReputationsSchema = require("./character-reputations");

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
  oauth2Schema,
  commonSchema,
  characterEquipmentSchema,
  characterProfileSchema,
  characterMediaSchema,
  characterReputationsSchema
];
