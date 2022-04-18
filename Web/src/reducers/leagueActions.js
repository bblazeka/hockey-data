import { axiosGraphQL } from "util/common";
import { LeagueActionTypes } from "./actionTypes";
import { getSchedule as getScheduleQuery, getTeamSchedule as getTeamScheduleQuery } from "services/querySchemas/league";

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
