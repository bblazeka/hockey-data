const axios = require('axios');

async function espnApiRequest(path) {
  const response = await axios.get(`http://site.api.espn.com${path}`);
  return response.data;
}

async function nhlApiRequest(path) {
  const response = await axios.get(`http://statsapi.web.nhl.com${path}`);
  return response.data;
}

module.exports = {
  nhlApiRequest,
  espnApiRequest
}