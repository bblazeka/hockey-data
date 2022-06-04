import { axiosGraphQL } from "util/common";
import { LeagueActionTypes } from "./actionTypes";
import { getTeamScheduleQuery as getTeamScheduleQuery, getScheduleQuery } from "services/querySchemas/league";

export async function getSchedule(start, end) {
  const response = await axiosGraphQL
  .post("", { query: getScheduleQuery, variables: { start, end } });
  return response.data;
}

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

export const setSortOrder = (sortOrder) => (dispatch) => {
  dispatch({
    type: LeagueActionTypes.SET_SCHEDULE_SORT_ORDER,
    payload: sortOrder
  });
};