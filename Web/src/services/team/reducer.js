import * as actionTypes from './actionTypes';

const defaultAppState = {
  loaded: false,
  players: [],
  roster: [],
}

const teamReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEAM:
      return {
        ...state,
        team: null
      }
    case actionTypes.TEAM_LOADED:
      return {
        ...state,
        team: action.payload
      }
    case actionTypes.TEAMS_LOADED:
      return {
        ...state,
        teams: action.payload
      }
    case actionTypes.DROPDOWN_TEAMS_LOADED:
      return {
        ...state,
        dropdownTeams: action.payload
      }
    default:
      return state
  }
}

export default teamReducer;