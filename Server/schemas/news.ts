import { gql } from "apollo-server-lambda";

export const newsSchema = gql`
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
`;
