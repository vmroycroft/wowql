const { gql } = require("apollo-server"),
  wowSchema = require("./wow"),
  poodlesSchema = require("./poodles"),
  clusterHeadacheTrackerSchema = require("./clusterHeadacheTracker");

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
  wowSchema,
  poodlesSchema,
  clusterHeadacheTrackerSchema
];
