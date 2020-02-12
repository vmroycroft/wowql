const characterEquipmentResolvers = require("./character-equipment"),
  characterProfileResolvers = require("./character-profile"),
  characterMediaResolvers = require("./character-media"),
  characterReputationsResolvers = require("./character-reputations");

module.exports = [
  characterEquipmentResolvers,
  characterProfileResolvers,
  characterMediaResolvers,
  characterReputationsResolvers
];
