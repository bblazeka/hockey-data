import * as actionTypes from './actionTypes';

const defaultAppState = {
  loading: false,
  gamesToday: []
};

const gameReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_GAME:
      return {
        ...state,
        loading: true,
        game: null
      };
    case actionTypes.GET_GAMES:
      return {
        ...state,
        loading: true,
        game: null
      };
    case actionTypes.GAME_LOADED:
      return {
        ...state,
        loading: false,
        game: action.payload,
        gamesBetweenTeams: null
      };
    case actionTypes.GAMES_FOUND:
      return {
        ...state,
        gamesBetweenTeams: action.payload,
        loading: false
      };
    case actionTypes.GAMES_NOT_FOUND:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GAMES_TODAY_LOADED:
      return {
        ...state,
        loading: false,
        gamesToday: action.payload
      };
    default:
      return state;
  }
};

export default gameReducer;