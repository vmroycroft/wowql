require('dotenv').config();

const oauth2 = require('simple-oauth2');

const credentials = {
	client: {
		id: process.env.BNET_ID,
		secret: process.env.BNET_SECRET
	},
	auth: {
		tokenHost: 'https://us.battle.net'
	}
};

class OAuthClient {
	constructor() {
		this.client = oauth2.create(credentials);
		this.token = null;
	}

	async getToken() {
		if (this.token === null || this.token.expired()) {
			const token = await this.client.clientCredentials.getToken();
			this.token = this.client.accessToken.create(token);
			console.log(`App token: ${this.token.token.access_token}`);
			return this.token.token.access_token;
		} else {
			return this.token.token.access_token;
		}
	}
}

module.exports = OAuthClient;
