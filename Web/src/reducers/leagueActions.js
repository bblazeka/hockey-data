import { axiosGraphQL } from "util/common";
import { LeagueActionTypes } from "./actionTypes";
import { getScheduleQuery } from "services/querySchemas/league";

export async function getSchedule(start, end) {
  const response = await axiosGraphQL
  .post("", { query: getScheduleQuery, variables: { start, end } });
  return response.data;
}

export const setSortOrder = (sortOrder) => (dispatch) => {
  dispatch({
    type: LeagueActionTypes.SET_SCHEDULE_SORT_ORDER,
    payload: sortOrder
  });
};