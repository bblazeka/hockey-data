import { axiosGraphQL } from '../../util/common';
import * as actionTypes from './actionTypes';
import * as querySchemas from './querySchemas';


export const getTweets = (query) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TWEETS,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getTweets(query) })
    .then(response => {
      dispatch({
        type: actionTypes.TWEETS_LOADED,
        payload: response.data.data.tweets
      });
    });
};

export const getNews = (query) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_NEWS,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getNews(query) })
    .then(response => {
      dispatch({
        type: actionTypes.NEWS_LOADED,
        payload: response.data.data.articles
      });
    });
};