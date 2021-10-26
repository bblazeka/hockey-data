const axios = require("axios");
const newsapi = require("../keys/newsapi.json");
const mapbox = require("../keys/mapbox.json");

async function nhlApiRequest(path) {
  const response = await axios.get(`http://statsapi.web.nhl.com${path}`);
  return response.data;
}

async function enhancedNhlApiRequest(path) {
  const response = await axios.get(`https://api.nhle.com${path}`);
  return response.data;
}

async function mapboxApiRequest(query) {
  const response = await axios.get(
    `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${mapbox.key}`
  );
  return response.data;
}

module.exports = {
  nhlApiRequest,
  enhancedNhlApiRequest,
  mapboxApiRequest,
};
