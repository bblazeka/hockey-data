const axios = require("axios");
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

async function wikiApiRequest(query) {
  const response = await axios.get(
    `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(
      query
    )}`
  );
  const pages = response.data.query.pages;
  const wikiResponse = pages[Object.keys(pages)[0]];

  return wikiResponse;
}

async function wikiApiAdvancedRequest(mainQuery, subQuery) {
  let res = await wikiApiRequest(`${mainQuery} ${subQuery}`);
  if (res === undefined || res.ns == 0) {
    res = await wikiApiRequest(`${mainQuery}`);
  }
  return res;
}

module.exports = {
  nhlApiRequest,
  enhancedNhlApiRequest,
  mapboxApiRequest,
  wikiApiRequest,
  wikiApiAdvancedRequest,
};
