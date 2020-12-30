const Twitter = require('twitter');
const twitterKeys = require('../keys/twitter.json');

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token,
  access_token_secret: twitterKeys.access_token_secret
});

async function getLimitStatus() {
  var res = await client.get('application/rate_limit_status', {}).catch(err => {
    console.log(err)
  });
  return res;
}

async function getTweets(accountScreenName) {
  var params = { screen_name: accountScreenName };
  var res = await client.get('statuses/user_timeline', params);
  return (res);
}

async function searchTweets(q, count, lang, result_type) {
  var tweet_mode = "extended";
  var params = { q, count, lang, result_type, tweet_mode };
  try {
    var res = await client.get('search/tweets', params);
    return res;
  }
  catch (error) {
    console.log("Error when trying to get tweets.", error);
    return {
      "statuses": []
    };
  }
}

module.exports = {
  getLimitStatus,
  getTweets,
  searchTweets,
}