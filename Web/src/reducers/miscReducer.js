import {MiscActionTypes} from './actionTypes';

const defaultAppState = {
  loadingNews: false,
  loadingTweets: false,
  players: [],
  news: [],
  tweets: [],
  locationLoading: false,
  location: null
};

const newsReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case MiscActionTypes.GET_NEWS:
      return {
        ...state,
        loadingNews: true,
        news: null
      };
    case MiscActionTypes.NEWS_LOADED:
      return {
        ...state,
        loadingNews: false,
        news: action.payload
      };
    case MiscActionTypes.GET_TWEETS:
      return {
        ...state,
        loadingTweets: true,
        tweets: null
      };
    case MiscActionTypes.TWEETS_LOADED:
      return {
        ...state,
        loadingTweets: false,
        tweets: action.payload
      };
      case MiscActionTypes.GET_LOCATION:
        return {
          ...state,
          locationLoading: true,
          location: null
        };
      case MiscActionTypes.LOCATION_LOADED:
        return {
          ...state,
          locationLoading: false,
          location: action.payload
        };
    default:
      return state;
  }
};

export default newsReducer;