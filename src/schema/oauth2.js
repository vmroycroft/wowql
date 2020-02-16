const { gql } = require("apollo-server");

const schemas = gql`
  extend type Query {
    """
    OAuth2
    """
    blizzardLoginUrl: String!
    authorizeWithBlizzard(code: String!): AuthPayload
  }

  type AuthPayload {
    access_token: String
    token_type: String
    expires_in: Int
    scope: String
  }
`;

module.exports = schemas;
