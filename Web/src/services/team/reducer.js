import * as actionTypes from './actionTypes';

const defaultAppState = {
  loading: false,
  players: [],
  roster: [],
};

const teamReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEAM:
      return {
        ...state,
        team: null
      };
    case actionTypes.TEAM_LOADED:
      return {
        ...state,
        team: action.payload
      };
    case actionTypes.TEAMS_LOADED:
      return {
        ...state,
        teams: action.payload
      };
    case actionTypes.TEAM_LOCATIONS_LOADED:
      return {
        ...state,
        locations: action.payload
      };
    case actionTypes.GET_DROPDOWN_TEAMS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DROPDOWN_TEAMS_LOADED:
      return {
        ...state,
        loading: false,
        dropdownTeams: action.payload
      };
    default:
      return state;
  }
};

export default teamReducer;