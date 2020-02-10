const characterEquipmentResolvers = require("./character-equipment"),
  characterProfileResolvers = require("./character-profile"),
  characterMediaResolvers = require("./character-media");

module.exports = [
  characterEquipmentResolvers,
  characterProfileResolvers,
  characterMediaResolvers
];
