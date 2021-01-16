var axios = require('axios');
const newsapi = require('../keys/newsapi.json');
const mapbox = require('../keys/mapbox.json');

async function nhlApiRequest(path) {
  const response = await axios.get(`http://statsapi.web.nhl.com${path}`);
  return response.data;
}

async function newsApiRequest(path) {
  const response = await axios.get(`http://newsapi.org${path}&apiKey=${newsapi.key}`);
  return response.data;
}

async function mapboxApiRequest(query) {
  const response = await axios.get(`https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapbox.key}`);
  return response.data;
}

module.exports = {
  nhlApiRequest,
  newsApiRequest,
  mapboxApiRequest,
}