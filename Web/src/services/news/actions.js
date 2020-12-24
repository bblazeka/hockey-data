import * as common from '../../util/common';
import * as actionTypes from './actionTypes';


export const getTweets = (query) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_TWEETS,
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/tweets/search/${query}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.TWEETS_LOADED,
      payload: data.statuses
    })
  }));
}

export const getNews = (query) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_NEWS,
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/news?query=${query}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.NEWS_LOADED,
      payload: data
    })
  }));
}