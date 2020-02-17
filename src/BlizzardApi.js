const pkg = require('../package.json'),
	axios = require('axios');

/**
 * GraphQL wrapper for the World of Warcraft Game Data APIs and Profile APIs.
 */
class BlizzardApi {
	constructor() {
		this.version = pkg.version;
		this.region = 'us';
		this.locale = 'en_US';
		this.hostname = `https://${this.region}.api.blizzard.com`;
	}

	/**
	 * Performs a GET request to the WoW API.
	 */
	get(path, namespace, token) {
		// axios
		// 	.get('https://us.api.blizzard.com/profile/user/wow', {
		// 		params: {
		// 			namespace: 'profile-us',
		// 			locale: 'en_US',
		// 			access_token: token
		// 		}
		// 	})
		// 	.then(function(r) {
		// 		console.log(JSON.parse(r.data));
		// 	})
		// 	.catch(error => {
		// 		console.log(error.response.data);
		// 	});

		return axios.get(`${this.hostname}${path}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'User-Agent': `Node.js/${process.versions.node} WowQL/${this.version}`
			},
			params: {
				locale: this.locale,
				namespace: `${namespace}-${this.region}`
			}
		});
	}
}

module.exports = BlizzardApi;
