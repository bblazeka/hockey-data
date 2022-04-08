import { axiosGraphQL } from 'util/common';
import { MiscActionTypes } from './actionTypes';
import {getTweets as getTweetsQuery, getNews as getNewsQuery, geocode as geocodeQuery} from 'services/querySchemas/misc';


export const getTweets = (query) => (dispatch) => {
  dispatch({
    type: MiscActionTypes.GET_TWEETS,
  });
  axiosGraphQL
    .post('', { query: getTweetsQuery, variables: { query } })
    .then(response => {
      dispatch({
        type: MiscActionTypes.TWEETS_LOADED,
        payload: response.data.data.tweets
      });
    });
};

export const getNews = (query) => (dispatch) => {
  dispatch({
    type: MiscActionTypes.GET_NEWS,
  });
  axiosGraphQL
    .post('', { query: getNewsQuery, variables: { query } })
    .then(response => {
      dispatch({
        type: MiscActionTypes.NEWS_LOADED,
        payload: response.data.data.articles
      });
    });
};

export const geocode = (query) => (dispatch) => {
  dispatch({
    type: MiscActionTypes.GET_LOCATION,
  });
  axiosGraphQL
    .post('', { query: geocodeQuery, variables: { query } })
    .then(response => {
      dispatch({
        type: MiscActionTypes.LOCATION_LOADED,
        payload: response.data.data.geocode[0]
      });
    });
};