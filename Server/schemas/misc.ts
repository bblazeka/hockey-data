import { gql } from "apollo-server-lambda";

export const miscSchema = gql`
  type TwitterStats {
    requests: Int
  }

  type Article {
    source: Source
    title: String
    description: String
    content: String
    publishedAt: String
    url: String
    author: String
    urlToImage: String
  }

  type Source {
    id: Int
    name: String
  }

  type Tweet {
    id: String
    createdAt: String
    text: String
    favoriteCount: Int
    retweetCount: Int
    url: String
    user: User
    entities: [Entity]
  }

  type User {
    id: Int
    name: String
    screenName: String
    description: String
    profileImageUrl: String
  }

  type Entity {
    text: String
  }

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
