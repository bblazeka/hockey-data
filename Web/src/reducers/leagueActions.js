import { axiosGraphQL } from "util/common";
import { LeagueActionTypes } from "./actionTypes";
import { getSchedule as getScheduleQuery, getStandings as getStandingsQuery, getTeamSchedule as getTeamScheduleQuery, getDivisionsWithTeams as getDivisionsWithTeamsQuery } from "services/querySchemas/league";

export const getSchedule = (start, end) => (dispatch) => {
  dispatch({
    type: LeagueActionTypes.GET_SCHEDULE,
  });
  axiosGraphQL
    .post("", { query: getScheduleQuery, variables: { start, end } })
    .then((response) => {
      dispatch({
        type: LeagueActionTypes.SCHEDULE_LOADED,
        payload: response.data.data.schedule,
      });
    });
};

export const getStandings = () => (dispatch) => {
  dispatch({
    type: LeagueActionTypes.GET_STANDINGS,
  });
  axiosGraphQL
    .post("", {
      query: getStandingsQuery,
      variables: { season: "20212022" },
    })
    .then((response) => {
      dispatch({
        type: LeagueActionTypes.STANDINGS_LOADED,
        payload: response.data.data.standings,
      });
    });
};

export const getTeamSchedule = (id, start, end) => (dispatch) => {
  dispatch({
    type: LeagueActionTypes.GET_TEAM_SCHEDULE,
  });
  axiosGraphQL
    .post("", {
      query: getTeamScheduleQuery,
      variables: { id: parseInt(id), start, end },
    })
    .then((response) => {
      dispatch({
        type: LeagueActionTypes.TEAM_SCHEDULE_LOADED,
        payload: response.data.data.scheduleByTeam,
      });
    });
};

export const getDivisionsWithTeams = () => (dispatch) => {
  dispatch({
    type: LeagueActionTypes.GET_DIVISIONS,
  });
  axiosGraphQL
    .post("", { query: getDivisionsWithTeamsQuery })
    .then((response) => {
      dispatch({
        type: LeagueActionTypes.DIVISIONS_LOADED,
        payload: response.data.data.divisionsWithTeams,
      });
    });
};
