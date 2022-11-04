import { loader } from "graphql.macro";

export const getTweets = loader("./getTweets.gql");

export const getNews = loader("./getNews.gql");