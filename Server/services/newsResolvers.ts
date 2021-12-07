import { DateTime } from "luxon";
import _ from "lodash";
import { newsApiRequest } from "../adapters/apihandler";
import { getLimitStatus, searchTweets } from "../adapters/twitterhandler";

type TGetContentParams = {
  query: string;
};

async function getArticles({ query }: TGetContentParams) {
  const pastDate = DateTime.now().minus({ weeks: 1 }).endOf("day").toISODate();

  const newsResponse = await newsApiRequest(
    `/v2/everything?q=${query}&from=${pastDate}&language=en&sortBy=relevancy&pageSize=10&language=en`
  );
  return _.sortBy(newsResponse.articles, function (obj) {
    return new Date(obj.publishedAt);
  });
}

async function getTweets({ query }: TGetContentParams) {
  const tweetsResponse = await searchTweets(query, 10, "en", "popular");
  const tweets = [];
  for (let status of tweetsResponse.statuses) {
    const users = status.entities.user_mentions.map((u) => {
      return { text: u.name };
    });
    const hashtags = status.entities.hashtags.map((h) => {
      return { text: h.text };
    });
    tweets.push({
      id: status.id_str,
      createdAt: status.created_at,
      text: status.full_text,
      url: `https://twitter.com/${status.user.screen_name}/status/${status.id_str}`,
      user: {
        id: status.user.id,
        name: status.user.name,
        screenName: status.user.screen_name,
        description: status.user.description,
        profileImageUrl: status.user.profile_image_url,
      },
      favoriteCount: status.favorite_count,
      retweetCount: status.retweet_count,
      entities: users.concat(hashtags),
    });
  }
  return tweets;
}

async function getUserTweets({ name }) {
  const result = await getTweets(name);
  return result;
}

async function getTwitterApiStatus() {
  const result = await getLimitStatus();
  return result;
}

export { getArticles, getUserTweets, getTweets, getTwitterApiStatus };
