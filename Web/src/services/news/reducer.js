import * as actionTypes from './actionTypes';

const defaultAppState = {
  loadingNews: false,
  loadingTweets: false,
  players: [],
  news: [],
  tweets: []
};

const newsReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_NEWS:
      return {
        ...state,
        loadingNews: true,
        news: null
      };
    case actionTypes.NEWS_LOADED:
      return {
        ...state,
        loadingNews: false,
        news: action.payload
      };
    case actionTypes.GET_TWEETS:
      return {
        ...state,
        loadingTweets: true,
        tweets: null
      };
    case actionTypes.TWEETS_LOADED:
      return {
        ...state,
        loadingTweets: false,
        tweets: action.payload
      };
    default:
      return state;
  }
};

export default newsReducer;