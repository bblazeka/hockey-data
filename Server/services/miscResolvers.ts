import { DateTime } from "luxon";
import { sortBy, uniqBy } from "lodash";

import { getLimitStatus, searchTweets } from "adapters/twitterhandler";
import { mapboxApiRequest, newsApiRequest } from "adapters/apihandler";

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
type TGetContentParams = {
  query: string;
};

async function getArticles({ query }: TGetContentParams) {
  const pastDate = DateTime.now().minus({ weeks: 1 }).endOf("day").toISODate();

  const newsResponse = await newsApiRequest(
    `/v2/everything?q=${query}&from=${pastDate}&language=en&sortBy=relevancy&pageSize=10&language=en&excludeDomains=youtube.com`
  );
  return sortBy(newsResponse.articles, (obj) => new Date(obj.publishedAt));
}

async function getTweets({ query }: TGetContentParams) {
  const tweetsResponse = await searchTweets(query, 10, "en", "popular");
  const tweets = tweetsResponse.statuses.map((status => {
    const users = status.entities.user_mentions.map((user) => ({ text: user.name }));
    const hashtags = status.entities.hashtags.map((hashtag) => ({ text: hashtag.text }));
    return({
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
      entities: uniqBy(users.concat(hashtags), "text"),
    });
  }))
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

export { geocode, getArticles, getUserTweets, getTweets, getTwitterApiStatus };
