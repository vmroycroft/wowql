/**
 * Wrapper for the Character Profile API.
 */
class CharacterProfile {
  constructor(blizzardApi) {
    this.blizzardApi = blizzardApi;
  }

  /**
   * Returns a profile summary for a character.
   *
   * @param {object} obj Options object
   * @param {string} obj.realm Realm name
   * @param {string} obj.name Character name
   */
  async getCharacterProfile(realm, name) {
    const response = await this.blizzardApi.get(
      `/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}`, // TODO make variables url safe
      "profile"
    );

    return response.status == 200 ? response.data : [];
  }
}

module.exports = CharacterProfile;
