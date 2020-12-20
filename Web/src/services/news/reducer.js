const defaultAppState = {
  loadingNews: false,
  loadingTweets: false,
  players: [],
  news: [],
  tweets: []
}

const newsReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case 'NEWS_LOADED':
      return {
        ...state,
        news: action.payload
      }
    case 'GET_TWEETS':
      return {
        ...state,
        loadingTweets: true,
        tweets: null
      }
    case 'TWEETS_LOADED':
      return {
        ...state,
        loadingTweets: false,
        tweets: action.payload
      }
    case 'HOME_NEWS_LOADED':
      return {
        ...state,
        homeNews: action.payload
      }
    default:
      return state
  }
}

export default newsReducer;