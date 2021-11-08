type TApiMapboxLocations = {
  type: string;
  query: string[];
  features: TApiMapboxFeature[];
  attribution: string;
};

type TApiMapboxFeature = {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: TApiMapboxFeatureProperties[];
  text: string;
  place_name: string;
  center: number[];
  geometry: TApiMapboxGeometry[];
  context: any[];
};

type TApiMapboxFeatureProperties = {
  foursquare: string;
  landmark: boolean;
  andress: string;
  category: string;
};

type TApiMapboxGeometry = {
  coordinates: number[];
  type: string;
};
