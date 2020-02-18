const axios = require("axios");

/**
 * Wrapper for the Account Profile API.
 */
class AccountProfile {
  constructor(blizzardApi) {
    this.blizzardApi = blizzardApi;
  }

  /**
   * Returns a profile summary for an account.
   *
   * Because this endpoint provides data about the current logged-in user's World of Warcraft account, it requires
   * an access token with the wow.profile scope acquired via the Authorization Code Flow.
   *
   * @param {string} region Region of the data to retrieve
   * @param {string} namespace Namespace to use to locate this document
   * @param {string} locale Locale to reflect in localized data
   * @param {function} getUser Function that returns the logged-in user's data
   */
  async getAccountProfile(region, namespace, locale, getUser) {
    const user = getUser();
    const response = await this.blizzardApi.get(
      encodeURI("/profile/user/wow"),
      "profile",
      user.token
    );
    // TODO move battletag somewhere else
    response.data.token = user.token;
    response.data.battletag = user.battletag;
    return response.status == 200 ? response.data : [];
  }
}

module.exports = AccountProfile;
