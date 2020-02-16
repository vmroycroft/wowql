const oAuth2Resolvers = require("./oauth2"),
  characterEquipmentResolvers = require("./character-equipment"),
  characterProfileResolvers = require("./character-profile"),
  characterMediaResolvers = require("./character-media"),
  characterReputationsResolvers = require("./character-reputations");

module.exports = [
  oAuth2Resolvers,
  characterEquipmentResolvers,
  characterProfileResolvers,
  characterMediaResolvers,
  characterReputationsResolvers
];
