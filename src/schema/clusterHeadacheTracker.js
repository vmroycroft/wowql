const { gql } = require('apollo-server');

const schemas = gql`
	extend type Query {
		currentAttack(user: String): CurrentAttackResponse
	}

	extend type Mutation {
		addCurrentAttack(user: String, startDate: String, startTime: String, endDate: String, endTime: String, kip: Int): CurrentAttackResponse
		updateCurrentAttack(user: String, startDate: String, startTime: String, endDate: String, endTime: String, kip: Int): UpdateCurrentAttackResponse
	}

	type CurrentAttack {
		id: ID!
		user: String
		startDate: String
		startTime: String
		endDate: String
		endTime: String
		kip: Int
	}

	# https://docs.mongodb.com/manual/reference/method/db.collection.update/#writeresults-update
	type WriteResult {
		nMatched: Int
		nUpserted: Int
		nModified: Int
	}

	type CurrentAttackResponse {
		success: Boolean
		message: String
		data: CurrentAttack
	}

	type UpdateCurrentAttackResponse {
		success: Boolean
		message: String
		data: WriteResult
	}

	# type AddCurrentAttackResponse {
	# 	success: Boolean
	# 	message: String
	# 	data: CurrentAttack
	# }

	# type UpdateCurrentAttackResponse {
	# 	success: Boolean
	# 	message: String
	# 	data: CurrentAttack
	# }
`;

module.exports = schemas;
