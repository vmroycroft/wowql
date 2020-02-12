const pkg = require("../package.json"),
  axios = require("axios"),
  { create } = require("simple-oauth2"),
  { RESTDataSource } = require("apollo-datasource-rest");

/**
 * GraphQL wrapper for the World of Warcraft Game Data APIs and Profile APIs.
 */
class BlizzardApi extends RESTDataSource {
  constructor() {
    super();
    this.version = pkg.version;
    this.token = null;
    this.region = "us";
    this.locale = "en_US";
    this.hostname = `https://${this.region}.api.blizzard.com`;
    this.oauth2 = create({
      client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET
      },
      auth: {
        tokenHost: `https://${this.region}.battle.net/oauth/token`
      }
    });
  }

  /**
   * Gets the application token from Blizzard.
   */
  async getApplicationToken() {
    const getTokenResponse = await this.oauth2.clientCredentials.getToken({});
    const accessToken = this.oauth2.accessToken.create(getTokenResponse);
    this.token = accessToken.token.access_token;
  }

  /**
   * Performs a GET request to the WoW API.
   */
  get(path, namespace) {
    return axios.get(`${this.hostname}${path}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "User-Agent": `Node.js/${process.versions.node} WowQL/${this.version}`
      },
      params: {
        locale: this.locale,
        namespace: `${namespace}-${this.region}`
      }
    });
  }
}

module.exports = BlizzardApi;
