import * as common from '../../util/common';


export const getTweets = (query) => (dispatch, getState) => {
  dispatch({
    type: 'GET_TWEETS',
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/tweets/search/${query}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'TWEETS_LOADED',
      payload: data.statuses
    })
  }));
}

export const getNews = (query) => (dispatch, getState) => {
  dispatch({
    type: 'GET_NEWS',
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/news?query=${query}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    console.log(data)
    dispatch({
      type: 'NEWS_LOADED',
      payload: data
    })
  }));
}