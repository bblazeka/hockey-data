const axios = require("axios");

async function nhlApiRequest(path) {
  const response = await axios.get(`http://statsapi.web.nhl.com${path}`);
  return response.data;
}

async function enhancedNhlApiRequest(path) {
  const response = await axios.get(`https://api.nhle.com${path}`);
  return response.data;
}

module.exports = {
  nhlApiRequest,
  enhancedNhlApiRequest,
};
