/**
 * Wrapper for the Character Equipment API.
 */
class CharacterEquipment {
  constructor(blizzardApi) {
    this.blizzardApi = blizzardApi;
  }

  /**
   * Gets all equipped items for the given character.
   *
   * @param {object} obj Options object
   * @param {string} obj.realm Realm name
   * @param {string} obj.name Character name
   */
  async getCharacterEquipment(realm, name) {
    const response = await this.blizzardApi.get(
      `/profile/wow/character/${realm}/${name}/equipment`,
      "profile"
    );

    return response.status == 200 ? response.data.equipped_items : [];
  }
}

module.exports = CharacterEquipment;
