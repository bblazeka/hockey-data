export function getTweets(query)
{
  return `{
    tweets(query: "${query}") { 
      id,
      text,
      favoriteCount,
      retweetCount,
      user {
        id,
        name,
        screenName,
        description,
        profileImageUrl
      },
      entities {
        text
      }
    }
  }`
};

export function getNews(query)
{
  return `{
    articles(query: "${query}") { 
      title,
      description,
      publishedAt,
      url,
      author,
      urlToImage,
      source { 
        name 
      }
    }
  }`
};