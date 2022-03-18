import Twitter from "twitter";
import twitterKeys from "keys/twitter.json";

const client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token,
  access_token_secret: twitterKeys.access_token_secret,
});

async function getLimitStatus() {
  const res = await client
    .get("application/rate_limit_status", {})
    .catch((err) => {
      console.log(err);
    });
  return res;
}

async function getTweets(accountScreenName) {
  const params = { screen_name: accountScreenName };
  const res = await client.get("statuses/user_timeline", params);
  return res;
}

async function searchTweets(
  query: string,
  count: number,
  lang: string,
  result_type: string
) {
  const tweet_mode = "extended";
  const params = { q: query, count, lang, result_type, tweet_mode };
  try {
    const res = await client.get("search/tweets", params);
    return res;
  } catch (error) {
    console.log("Error when trying to get tweets.", error);
    return {
      statuses: [],
    };
  }
}

export { getLimitStatus, getTweets, searchTweets };
