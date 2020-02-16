module.exports = {
  Query: {
    blizzardLoginUrl: () => {
      let scope = "wow.profile";
      let redirectUri = encodeURI("http://localhost:8080/#/home");
      let responseType = "code";
      let state = "asdf";

      return `https://us.battle.net/oauth/authorize?state=${state}&client_id=${process.env.CLIENT_ID}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
    },
    authorizeWithBlizzard: async (_, { code }) => {
      const axios = require("axios");
      axios({
        method: "post",
        url: "https://us.battle.net/oauth/token",
        data: {
          redirect_uri: encodeURI("http://localhost:8080/#/home"),
          scope: "wow.profile",
          grant_type: "authorization_code",
          code: code
        },
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET
        }
      }).then(res => {
        console.log(res);
        return res;
      });
    }
  }
};
