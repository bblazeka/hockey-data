export const getTweets = /* GraphQL */`
 query tweets($query: String){
    tweets(query: $query) { 
      id,
      createdAt,
      text,
      url,
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
  }`;

export const getNews = /* GraphQL */`
  query articles($query: String){
    articles(query: $query) { 
      title,
      content,
      description,
      publishedAt,
      url,
      author,
      urlToImage,
      source { 
        name 
      }
    }
  }`;