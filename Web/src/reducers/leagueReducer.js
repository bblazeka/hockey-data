
import { sortBy } from "lodash";

import {LeagueActionTypes} from './actionTypes';

export const EScheduleSortOrder = {
  team: "team",
  score: "score"
};

const defaultAppState = {
  loading: false,
  players: [],
  roster: [],
  gamesToday: [],
  scheduleSortOrder: EScheduleSortOrder.team
};

const leagueReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case LeagueActionTypes.GET_SCHEDULE:
      return {
        ...state,
        schedule: null
      };
    case LeagueActionTypes.SCHEDULE_LOADED:
      return {
        ...state,
        schedule: state.scheduleSortOrder === EScheduleSortOrder.team ? action.payload : sortBy(action.payload, "scheduleScore")
      };
    case LeagueActionTypes.TEAM_SCHEDULE_LOADED:
      return {
        ...state,
        teamGames: action.payload
      };
    case LeagueActionTypes.SET_SCHEDULE_SORT_ORDER:
      return {
        ...state,
        scheduleSortOrder: action.payload
      };
    default:
      return state;
  }
};

export default leagueReducer;