import {GameActionTypes} from './actionTypes';

const defaultAppState = {
  loading: false,
  teamId: undefined,
  opponentId: undefined,
  season: undefined,
  gamesToday: []
};

const gameReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case GameActionTypes.GET_GAME:
      return {
        ...state,
        loading: true,
        game: null
      };
    case GameActionTypes.GET_GAMES:
      return {
        ...state,
        ...action.payload,
        loading: true,
        game: null
      };
    case GameActionTypes.GAME_LOADED:
      return {
        ...state,
        loading: false,
        game: action.payload,
        gamesBetweenTeams: undefined
      };
    case GameActionTypes.GAMES_FOUND:
      return {
        ...state,
        gamesBetweenTeams: action.payload,
        loading: false
      };
    case GameActionTypes.GAMES_NOT_FOUND:
      return {
        ...state,
        loading: false
      };
    case GameActionTypes.GAMES_TODAY_LOADED:
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