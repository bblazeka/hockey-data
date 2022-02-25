import { getLogo } from "../../util/assets";
import * as actionTypes from "./actionTypes";

const defaultAppState = {
  loadingPlayer: false,
  loading: false,
  players: [],
  roster: [],
  loadingSearchResults: false,
  loadingSelectedPlayers: false,
  selectedPlayers: {},
};

const playerReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAYER:
      return {
        ...state,
        player: null,
        loadingPlayer: true,
      };
    case actionTypes.ADD_PLAYER:
      return {
        ...state,
      };
    case actionTypes.PLAYER_ADDED:
      return {
        ...state,
      };
    case actionTypes.REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter(
          (p) => p.id !== parseInt(action.payload.id)
        ),
      };
    case actionTypes.PLAYER_LOADED:
      return {
        ...state,
        player: action.payload,
        loadingPlayer: false,
      };
    case actionTypes.BASIC_SEARCH_PLAYER:
      return {
        ...state,
        loadingSearchResults: true,
      };
    case actionTypes.BASIC_PLAYER_LOADED:
      return {
        ...state,
        loadingSearchResults: false,
        suggestions: action.payload.map((result) => {
          return {
            title: result.fullName,
            description: result.currentTeam
              ? result.currentTeam.name
              : "Unknown",
            image: result.currentTeam
              ? getLogo(result.currentTeam.id)
              : getLogo(0),
            id: result.id,
          };
        }),
      };
    case actionTypes.GET_SELECTED_PLAYERS:
      return {
        ...state,
        loadingSelectedPlayers: true,
      };
    case actionTypes.SELECTED_PLAYERS_LOADED:
      return {
        ...state,
        loadingSelectedPlayers: false,
        selectedPlayers: action.payload ?? {},
      };
    case actionTypes.REMOVE_ALL_PLAYERS:
      return {
        ...state,
        selectedPlayers: {},
      };
    default:
      return state;
  }
};

export default playerReducer;
