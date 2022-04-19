import {LeagueActionTypes} from './actionTypes';

const defaultAppState = {
  loading: false,
  players: [],
  roster: [],
  gamesToday: []
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
        schedule: action.payload
      };
    case LeagueActionTypes.TEAM_SCHEDULE_LOADED:
      return {
        ...state,
        teamGames: action.payload
      };
    default:
      return state;
  }
};

export default leagueReducer;