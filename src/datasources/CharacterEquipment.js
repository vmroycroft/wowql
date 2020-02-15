/**
 * Wrapper for the Character Equipment API.
 */
class CharacterEquipment {
  constructor(blizzardApi) {
    this.blizzardApi = blizzardApi;
  }

  /**
   * Returns a summary of the items equipped by a character.
   *
   * @param {object} obj Options object
   * @param {string} obj.realm Realm name
   * @param {string} obj.name Character name
   */
  async getCharacterEquipment(realm, name) {
    const response = await this.blizzardApi.get(
      encodeURI(
        `/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/equipment`
      ),
      "profile"
    );

    return response.status == 200 ? response.data : [];
  }
}

module.exports = CharacterEquipment;
