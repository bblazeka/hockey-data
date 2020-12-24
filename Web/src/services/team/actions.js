import * as common from '../../util/common';
import * as actionTypes from './actionTypes';

export const getTeam = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_TEAM,
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/teams/${id}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.TEAM_LOADED,
      payload: data
    })
  }));
}

export const getTeams = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_TEAMS,
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/teams`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.TEAMS_LOADED,
      payload: data
    })
  }));
}

export const getDropdownTeams = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_DROPDOWN_TEAMS,
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/teams`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.DROPDOWN_TEAMS_LOADED,
      payload: data
    })
  }));
}