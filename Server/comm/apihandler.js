const axios = require('axios');
const db = require('../keys/newsapi.json');

async function nhlApiRequest(path) {
  const response = await axios.get(`http://statsapi.web.nhl.com${path}`);
  return response.data;
}

async function newsApiRequest(path) {
  const response = await axios.get(`http://newsapi.org${path}&apiKey=${db.key}`);
  return response.data;
}

module.exports = {
  nhlApiRequest,
  newsApiRequest,
}