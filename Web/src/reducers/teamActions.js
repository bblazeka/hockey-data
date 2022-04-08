import { axiosGraphQL } from "util/common";
import {TeamActionTypes} from "./actionTypes";
import {getTeam as getTeamQuery, getTeams as getTeamsQuery, getTeamLocations as getTeamLocationsQuery} from "services/querySchemas/team";

export const getTeam = (id) => (dispatch) => {
  dispatch({
    type: TeamActionTypes.GET_TEAM,
  });
  axiosGraphQL
    .post("", { query: getTeamQuery, variables: { id: parseInt(id) } })
    .then((response) => {
      dispatch({
        type: TeamActionTypes.TEAM_LOADED,
        payload: response.data.data.team,
      });
    });
};

export const getTeamLocations = () => (dispatch) => {
  dispatch({
    type: TeamActionTypes.GET_TEAM_LOCATIONS,
  });
  axiosGraphQL
    .post("", { query: getTeamLocationsQuery })
    .then((response) => {
      dispatch({
        type: TeamActionTypes.TEAM_LOCATIONS_LOADED,
        payload: response.data.data.teamLocations,
      });
    });
};

export const getTeams = () => (dispatch) => {
  dispatch({
    type: TeamActionTypes.GET_TEAMS,
  });
  axiosGraphQL.post("", { query: getTeamsQuery }).then((response) => {
    dispatch({
      type: TeamActionTypes.TEAMS_LOADED,
      payload: response.data.data.teams,
    });
  });
};

export const getDropdownTeams = () => (dispatch) => {
  dispatch({
    type: TeamActionTypes.GET_DROPDOWN_TEAMS,
  });
  axiosGraphQL.post("", { query: getTeamsQuery }).then((response) => {
    dispatch({
      type: TeamActionTypes.DROPDOWN_TEAMS_LOADED,
      payload: response.data.data.teams,
    });
  });
};
