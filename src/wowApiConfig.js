const pkg = require("../package.json"),
  axios = require("axios");

const version = pkg.version,
  region = "us",
  key = "58a68a446b3c4e0bb1b4bf038740a146",
  secret = "8WUiNBjDdZa2U7aANScukuQ8I7PdLs4J";

module.exports = (async function() {
  const response = await getApplicationToken();
  return response.data.access_token;
})();

// init();

// async function init() {
//   try {
//     await getApplicationToken().then(res => {
//       defaults.token = res.data.access_token;
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

function getApplicationToken() {
  return axios.get(`https://${region}.battle.net/oauth/token`, {
    auth: {
      username: key,
      password: secret
    },
    headers: {
      "User-Agent": `Node.js/${process.versions.node} WowQL/${version}`
    },
    params: {
      grant_type: "client_credentials"
    }
  });
}
