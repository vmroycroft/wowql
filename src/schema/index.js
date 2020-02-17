const { gql } = require('apollo-server-express'),
	commonSchema = require('./common'),
	accountProfileSchema = require('./account-profile'),
	characterEquipmentSchema = require('./character-equipment'),
	characterProfileSchema = require('./character-profile'),
	characterMediaSchema = require('./character-media'),
	characterReputationsSchema = require('./character-reputations');

const linkSchema = gql`
	type Query {
		_: Boolean
	}
	type Mutation {
		_: Boolean
	}
`;

module.exports = [linkSchema, commonSchema, accountProfileSchema, characterEquipmentSchema, characterProfileSchema, characterMediaSchema, characterReputationsSchema];
