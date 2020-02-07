const { ClusterHeadacheTracker } = require('../models'),
	{ CurrentAttack } = ClusterHeadacheTracker;

module.exports = {
	Query: {
		currentAttack: async (_, args) => {
			try {
				let response = await CurrentAttack.find(args).exec();
				return {
					success: true,
					message: null,
					data: response.length ? response[0] : null
				};
			} catch (e) {
				return {
					success: false,
					message: e.message,
					data: null
				};
			}
		}
	},
	Mutation: {
		addCurrentAttack: async (_, args) => {
			try {
				let response = await CurrentAttack.create(args);
				return {
					success: true,
					message: null,
					data: response
				};
			} catch (e) {
				return {
					success: false,
					message: e.message,
					data: null
				};
			}
		},

		updateCurrentAttack: async (_, args) => {
			try {
				let response = await CurrentAttack.updateOne(args);
				return {
					success: true,
					message: null,
					data: response
				};
			} catch (e) {
				return {
					success: false,
					message: e.message,
					data: null
				};
			}
		}
	}
};
