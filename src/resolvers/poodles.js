const { Administration } = require('../models');

module.exports = {
	Query: {
		administrations: async (_, args) => await Administration.find(args).exec()
	},
	Mutation: {
		addAdministration: async (_, args) => {
			try {
				let response = await Administration.create(args);
				return {
					success: true,
					message: null,
					administration: response
				};
			} catch (e) {
				return {
					success: false,
					message: e.message,
					administration: null
				};
			}
		},

		removeAdministration: async (_, args) => {
			try {
				let response = await Administration.deleteOne(args);
				return {
					success: true,
					message: null,
					deletedCount: response.deletedCount
				};
			} catch (e) {
				return {
					success: false,
					message: e.message,
					deletedCount: null
				};
			}
		},

		updateAdministration: async (_, args) => {
			try {
				let response = await Administration.updateOne(
					{
						poodle: args.poodle,
						date: args.date,
						scheduledTime: args.scheduledTime
					},
					{
						administeredTime: args.administeredTime
					}
				);

				return {
					success: true,
					message: null,
					updatedCount: response.nModified
				};
			} catch (e) {
				return {
					success: false,
					message: e.message,
					updatedCount: null
				};
			}
		}
	}
};
