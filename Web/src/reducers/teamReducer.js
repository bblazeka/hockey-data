import {TeamActionTypes} from './actionTypes';

const defaultAppState = {
  loading: false,
  players: [],
  roster: [],
};

const teamReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case TeamActionTypes.GET_TEAM:
      return {
        ...state,
        team: null
      };
    case TeamActionTypes.TEAM_LOADED:
      return {
        ...state,
        team: action.payload
      };
    case TeamActionTypes.TEAMS_LOADED:
      return {
        ...state,
        teams: action.payload
      };
    case TeamActionTypes.TEAM_LOCATIONS_LOADED:
      return {
        ...state,
        locations: action.payload
      };
    case TeamActionTypes.GET_DROPDOWN_TEAMS:
      return {
        ...state,
        loading: true
      };
    case TeamActionTypes.DROPDOWN_TEAMS_LOADED:
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