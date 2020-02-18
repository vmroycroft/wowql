/**
 * Wrapper for the Character Reputations API.
 */
class CharacterReputations {
  constructor(blizzardApi) {
    this.blizzardApi = blizzardApi;
  }

  /**
   * Returns a summary of a character's reputations.
   *
   * @param {object} obj Options object
   * @param {string} obj.realm Realm name
   * @param {string} obj.name Character name
   * @param {function} getUser Function that returns the logged-in user's data
   */
  async getCharacterReputations(realm, name, getUser) {
    const user = getUser();
    const response = await this.blizzardApi.get(
      encodeURI(
        `/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/reputations`
      ),
      "profile",
      user.token
    );

    return response.status == 200 ? response.data : [];
  }
}

module.exports = CharacterReputations;
