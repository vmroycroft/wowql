const { RESTDataSource } = require('apollo-datasource-rest');

class AdministrationAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = 'http://vanessaroycroft.com/medicine/server/databaseInterface.php';
		this.date = '';
		this.remove = false;
	}

	/**
	 * Gets all medicine administrations for the given date.
	 *
	 * @param {string} date The date to get medicine administrations for.
	 */
	async getAdministrationsByDate({ date }) {
		this.date = date;
		let response = await this.get('');
		response = JSON.parse(response);
		return Array.isArray(response) ? response.map(administration => this.administrationReducer(administration)) : [];
	}

	async administer({ poodleName, date, scheduledTime, administeredTime }) {
		let response = await this.post('', { poodleName, date, scheduledTime, administeredTime });
		response = JSON.parse(response);
		return response;
	}

	async removeAdministration({ poodleName, date, scheduledTime }) {
		this.remove = true;
		let response = await this.post('', { poodleName, date, scheduledTime });
		response = JSON.parse(response);
		return response;
	}

	/**
	 * Transforms the data object obtained from the endpoint into the shape defined in the schema.
	 *
	 * @param {object} administration The data object obtained from the endpoint.d
	 */
	administrationReducer(administration) {
		return {
			poodle: {
				id: null,
				name: administration.patient
			},
			date: administration.date,
			scheduledTime: administration.scheduledTime,
			administeredTime: administration.administeredTime
		};
	}

	willSendRequest(request) {
		// todo: update poodle databaseInterface.php to handle this better or figure out how to make this better
		switch (request.method) {
			case 'GET':
				request.params.set('action', 'get');
				request.params.set('date', this.date);
				break;
			case 'POST':
				this.remove ? request.params.set('action', 'remove') : request.params.set('action', 'save');
				this.remove = false;
				break;
			default:
				console.log(`Unsupported request method: ${request.method}`);
		}
	}
}

module.exports = AdministrationAPI;
