import * as common from '../../util/common';


export const getTeam = (id) => (dispatch, getState) => {
  dispatch({
    type: 'GET_TEAMS',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/team/${id}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'TEAM_LOADED',
      payload: data
    })
  }));
}

export const getTeams = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_TEAMS',
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/teams`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'TEAMS_LOADED',
      payload: data
    })
  }));
}

export const getDropdownTeams = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_DROPDOWN_TEAMS',
  });

  /*common.customFetch(`${common.apiServiceEndpoint}/api/teams/dropdown`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'DROPDOWN_TEAMS_LOADED',
      payload: data
    })
  }));*/
}