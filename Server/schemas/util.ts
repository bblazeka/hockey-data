import { gql } from "apollo-server-lambda";

export const utilSchema = gql`
  type TeamLocations {
    teamLocations: [Location]
    seasonDescription: String
    divisions: [KeyValue]
  }

  type Location {
    id: Int
    text: String
    placeName: String
    color: String
    center: [Float]
  }

  type KeyValue {
    key: String
    value: String
  }
`;
