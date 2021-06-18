import * as actionTypes from './actionTypes';

const defaultAppState = {
  loading: false,
  players: [],
  roster: [],
  gamesToday: []
};

const leagueReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_SCHEDULE:
      return {
        ...state,
        schedule: null
      };
    case actionTypes.SCHEDULE_LOADED:
      return {
        ...state,
        schedule: action.payload
      };
    case actionTypes.STANDINGS_LOADED:
      return {
        ...state,
        standings: action.payload
      };
    case actionTypes.TEAM_SCHEDULE_LOADED:
      return {
        ...state,
        teamGames: action.payload
      };
    case actionTypes.GET_DIVISIONS:
      return {
        ...state,
        divisionsWithTeams: action.payload
      };
    case actionTypes.DIVISIONS_LOADED:
      return {
        ...state,
        divisionsWithTeams: action.payload
      };
    default:
      return state;
  }
};

export default leagueReducer;