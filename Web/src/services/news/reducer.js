const defaultAppState = {
  loaded: false,
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
      case 'TWEETS_LOADED':
        return {
          ...state,
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