const accountProfileResolvers = require('./account-profile'),
	characterEquipmentResolvers = require('./character-equipment'),
	characterProfileResolvers = require('./character-profile'),
	characterMediaResolvers = require('./character-media'),
	characterReputationsResolvers = require('./character-reputations');

module.exports = [accountProfileResolvers, characterEquipmentResolvers, characterProfileResolvers, characterMediaResolvers, characterReputationsResolvers];
