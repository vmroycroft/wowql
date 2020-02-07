const { RESTDataSource } = require("apollo-datasource-rest");
const pkg = require("../../package.json");
const axios = require("axios");

class WowApi extends RESTDataSource {
  constructor(token) {
    super();
    this.token = token;
    this.version = pkg.version;
    this.defaults = {
      region: "us",
      locale: "en_US"
    };
    this.defaults.hostname = `https://${this.defaults.region}.api.blizzard.com`;
  }

  /**
   * Gets all characters for the given player.
   *
   * @param {object} obj Options object
   * @param {string} obj.player The player to get characters for
   */
  async getCharacters({ player }) {
    const response = await axios.get(
      `${this.defaults.hostname}/profile/wow/character/spirestone/maikoa/equipment`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "User-Agent": `Node.js/${process.versions.node} Blizzard.js/${this.version}`
        },
        params: {
          locale: this.defaults.locale,
          namespace: `profile-${this.defaults.region}`
        }
      }
    );

    return response.status == 200
      ? this.characterReducer(response.data.character)
      : [];
  }

  /**
   * Transforms the data object obtained from the endpoint into the shape defined in the schema.
   *
   * @param {object} character The data object obtained from the endpoint
   */
  characterReducer(character) {
    return [
      {
        name: character.name
      }
    ];
  }
}

module.exports = WowApi;
