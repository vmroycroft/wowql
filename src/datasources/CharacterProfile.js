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
	async getCharacterProfile(realm, name, getUser) {
		const token = getUser().token;
		const response = await this.blizzardApi.get(encodeURI(`/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}`), 'profile', token);
		return response.status == 200 ? response.data : [];
	}
}

module.exports = CharacterProfile;
