var axios = require('axios');
const newsapi = require('../keys/newsapi.json');

async function nhlApiRequest(path) {
  const response = await axios.get(`http://statsapi.web.nhl.com${path}`);
  return response.data;
}

async function newsApiRequest(path) {
  const response = await axios.get(`http://newsapi.org${path}&apiKey=${newsapi.key}`);
  return response.data;
}

module.exports = {
  nhlApiRequest,
  newsApiRequest,
}