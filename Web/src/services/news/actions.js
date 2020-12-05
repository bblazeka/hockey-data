import * as common from '../../util/common';


export const getTweets = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_TWEETS',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/tweets/search/nhl`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'TWEETS_LOADED',
      payload: data.statuses
    })
  }));
}

export const getHome = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_HOME_NEWS',
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/news`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'HOME_NEWS_LOADED',
      payload: data
    })
  }));
}