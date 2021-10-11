import { mapboxApiRequest } from "../../adapters/apihandler";

async function geocode({ query }) {
  const result = await mapboxApiRequest(query);
  return result.features.map((el) => {
    return {
      text: el.text,
      placeName: el.place_name,
      center: el.center,
    };
  });
}

export { geocode };
