import { axiosGraphQL } from '../../util/common';
import * as actionTypes from './actionTypes';
import * as querySchemas from './querySchemas';


export const getTeam = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TEAM,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getTeam(id) })
    .then(response => {
      dispatch({
        type: actionTypes.TEAM_LOADED,
        payload: response.data.data.team
      });
    });
};

export const getTeamLocations = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TEAM_LOCATIONS,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getTeamLocations() })
    .then(response => {
      dispatch({
        type: actionTypes.TEAM_LOCATIONS_LOADED,
        payload: response.data.data.teamLocations
      });
    });
};

export const getTeams = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TEAMS,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getTeams() })
    .then(response => {
      dispatch({
        type: actionTypes.TEAMS_LOADED,
        payload: response.data.data.teams
      });
    });
};

export const getDropdownTeams = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_DROPDOWN_TEAMS,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getTeams() })
    .then(response => {
      dispatch({
        type: actionTypes.DROPDOWN_TEAMS_LOADED,
        payload: response.data.data.teams
      });
    });
};