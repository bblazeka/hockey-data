import { getLogo } from "util/assets";
import {PlayerActionTypes} from "./actionTypes";
import config from "util/config.json";

const defaultAppState = {
  loadingPlayer: false,
  loading: false,
  players: [],
  roster: [],
  loadingSearchResults: false,
  loadingSelectedPlayers: false,
  selectedPlayers: {},
  selectedPlayersOption: config.currentSeason,
};

const playerReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case PlayerActionTypes.GET_PLAYER:
      return {
        ...state,
        player: null,
        loadingPlayer: true,
      };
    case PlayerActionTypes.ADD_PLAYER:
      return {
        ...state,
      };
    case PlayerActionTypes.PLAYER_ADDED:
      return {
        ...state,
      };
    case PlayerActionTypes.REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter(
          (p) => p.id !== parseInt(action.payload.id)
        ),
      };
    case PlayerActionTypes.PLAYER_LOADED:
      return {
        ...state,
        player: action.payload,
        loadingPlayer: false,
      };
    case PlayerActionTypes.BASIC_SEARCH_PLAYER:
      return {
        ...state,
        loadingSearchResults: true,
      };
    case PlayerActionTypes.BASIC_PLAYER_LOADED:
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
    case PlayerActionTypes.GET_SELECTED_PLAYERS:
      return {
        ...state,
        selectedPlayersOption: action.payload,
        loadingSelectedPlayers: true,
      };
    case PlayerActionTypes.SELECTED_PLAYERS_LOADED:
      return {
        ...state,
        loadingSelectedPlayers: false,
        selectedPlayers: action.payload ?? { skaters: [], goalies: [] },
      };
    case PlayerActionTypes.REMOVE_ALL_PLAYERS:
      return {
        ...state,
        selectedPlayers: {},
      };
    default:
      return state;
  }
};

export default playerReducer;
