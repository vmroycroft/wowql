/**
 * Wrapper for the Character Media API.
 */
class CharacterMedia {
  constructor(blizzardApi) {
    this.blizzardApi = blizzardApi;
  }

  /**
   * Returns a summary of the media assets available for a character (such as an avatar render).
   *
   * @param {object} obj Options object
   * @param {string} obj.realm Realm name
   * @param {string} obj.name Character name
   */
  async getCharacterMedia(realm, name) {
    const response = await this.blizzardApi.get(
      `/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/character-media`, // TODO make variables url safe
      "profile"
    );

    return response.status == 200 ? response.data : [];
  }
}

module.exports = CharacterMedia;
