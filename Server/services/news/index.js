const { DateTime } = require('luxon');

const apicomm = require('../../comm/apihandler');
const twtcomm = require('../../comm/twitterhandler');
const common = require('common');

async function getArticles({query})
{
  var pastDate = DateTime.now().minus({ weeks: 1 }).endOf('day').toJSDate();

  var newsResponse = await apicomm.newsApiRequest(`/v2/everything?q=${query}&from=${common.DateToServerFormat(pastDate)}&language=en&sortBy=relevancy&pageSize=10&language=en`);
  return newsResponse.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

async function getTweets({query})
{
  var tweetsResponse = await twtcomm.searchTweets(query, 10, 'en', 'popular');
  var tweets = [];
  for(let status of tweetsResponse.statuses)
  {
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
      entities: status.entities.hashtags.map(h => {
        return { text: h.text };
      })
    });
  }
  return tweets;
}

async function getUserTweets({name}) {
  var result = await twtcomm.getTweets(name);
  return result;
}

async function getTwitterApiStatus() {
  var result = await twtcomm.getLimitStatus();
  return result;
}

module.exports = {
  getArticles,
  getUserTweets,
  getTweets,
  getTwitterApiStatus,
};