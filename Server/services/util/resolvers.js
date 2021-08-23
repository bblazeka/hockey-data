const apicomm = require("../../comm/apihandler");

async function geocode({ query }) {
  const result = await apicomm.mapboxApiRequest(query);
  return result.features.map((el) => {
    return {
      text: el.text,
      placeName: el.place_name,
      center: el.center,
    };
  });
}

module.exports = {
  geocode,
};
