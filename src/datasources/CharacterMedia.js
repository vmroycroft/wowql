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
   * @param {function} getUser Function that returns the logged-in user's data
   */
  async getCharacterMedia(realm, name, getUser) {
    const user = getUser();
    const response = await this.blizzardApi.get(
      encodeURI(
        `/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/character-media`
      ),
      "profile",
      user.token
    );

    return response.status == 200 ? response.data : [];
  }
}

module.exports = CharacterMedia;
