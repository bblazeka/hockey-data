import { mapboxApiRequest } from "adapters/apihandler";

type TGeocodeParams = {
  query: string;
};

async function geocode({ query }: TGeocodeParams): Promise<TGeocodeLocation[]> {
  const result = await mapboxApiRequest(query);
  return result.features.map((el) => ({
    text: el.text,
    placeName: el.place_name,
    center: el.center,
  }));
}

export { geocode };
