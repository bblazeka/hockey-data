import * as common from '../../util/common';


export const getNews = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_NEWS',
  });

  common.customFetch(`${common.pyServiceEndpoint}/news`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'NEWS_LOADED',
      payload: data
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