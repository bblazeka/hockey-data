import * as actionTypes from './actionTypes';

const defaultAppState = {
  loading: false,
  players: [],
  roster: [],
  prediction: [],
  gamesToday: []
}

const leagueReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_SCHEDULE:
      return {
        ...state,
        schedule: null
      }
    case actionTypes.SCHEDULE_LOADED:
      return {
        ...state,
        schedule: action.payload
      }
    case actionTypes.STANDINGS_LOADED:
      return {
        ...state,
        standings: action.payload
      }
    case actionTypes.GET_GAME:
      return {
        ...state,
        game: null
      }
    case actionTypes.FIND_GAME:
      return {
        ...state,
        loading: true,
        game: null
      }
    case actionTypes.GAME_LOADED:
      return {
        ...state,
        game: action.payload
      }
    case actionTypes.GAME_FOUND:
      return {
        ...state,
        loading: false
      }
    case actionTypes.TEAM_SCHEDULE_LOADED:
      return {
        ...state,
        teamGames: action.payload
      }
    case actionTypes.GAMES_TODAY_LOADED:
      return {
        ...state,
        gamesToday: action.payload
      }
    default:
      return state
  }
}

export default leagueReducer;