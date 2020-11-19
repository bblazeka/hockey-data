import * as common from '../../util/common';
import * as actionTypes from './actionTypes';

export const getPlayer = (id) => (dispatch, getState) => {
  dispatch({
    type: 'GET_PLAYER',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/player/${id}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.PLAYER_LOADED,
      payload: data
    })
  }));
}

export const searchBasicPlayer = (name) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.BASIC_SEARCH_PLAYER,
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/data/player/search/${name}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.BASIC_PLAYER_LOADED,
      payload: data
    })
  }));
}

export const searchPlayer = (name, individual)  => (dispatch, getState) => {
  dispatch({
    type: actionTypes.SEARCH_PLAYER,
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/data/player/search/${name}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    common.customFetch(`${common.apiServiceEndpoint}/api/player/${data[0].id}`, getState, {
      method: 'GET',
    }).then(response => response.json().then(data2 => {
      if (individual) {
        dispatch({
          type: actionTypes.PLAYER_LOADED,
          payload: data2
        })
      }
      else
      {
        dispatch({
          type: actionTypes.ADD_PLAYER,
          payload: data2
        })
      }
    }));
  }));
}

export const removePlayer = (id) => ({
  type: actionTypes.REMOVE_PLAYER,
  payload: {
    id,
  }
})

export const addToLineup = (player) => ({
  type: actionTypes.ADD_TO_LINEUP,
  payload: {
    player,
  }
})