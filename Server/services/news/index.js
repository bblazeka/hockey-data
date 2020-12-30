const { Database } = require("../../comm/dbhandler");
const apicomm = require('../../comm/apihandler');
const twtcomm = require('../../comm/twitterhandler');

var db = new Database();

function init(database)
{
  db = database;
}

async function getArticles({query})
{
  var newsResponse = await apicomm.newsApiRequest(`/v2/everything?q=${query}&language=en&sortBy=popularity`);
  return newsResponse.articles;
}

async function getTweets({query})
{
  var tweetsResponse = await twtcomm.searchTweets(query, 10, 'en', "popular");
  var tweets = [];
  for(let status of tweetsResponse.statuses)
  {
    tweets.push({
      id: status.id,
      text: status.full_text,
      user: {
        id: status.user.id,
        name: status.user.name,
        screenName: status.user.screen_name,
        description: status.user.description,
        profileImageUrl: status.user.profile_image_url,
      },
      favoriteCount: status.favorite_count,
      retweetCount: status.retweet_count,
      entities: status.entities.hashtags.map(h => {
        return { text: h.text }
      })
    })
  }
  return tweets;
}

module.exports = {
  init,
  getArticles,
  getTweets,
}