export const GameActionTypes = {
  GET_GAMES : 'GET_GAMES',
  GAMES_FOUND: "GAMES_FOUND",
  GAMES_NOT_FOUND: "GAMES_NOT_FOUND",
  GET_GAMES_TODAY: "GET_GAMES_TODAY",
};

export const LeagueActionTypes = {
  GET_SCHEDULE: "GET_SCHEDULE",
  SCHEDULE_LOADED: "SCHEDULE_LOADED",
  SCHEDULE_LOAD_FAILED: "SCHEDULE_LOAD_FAILED",
  GET_TEAM_SCHEDULE: "GET_TEAM_SCHEDULE",
  TEAM_SCHEDULE_LOADED: "TEAM_SCHEDULE_LOADED",
  GET_DIVISIONS: "GET_DIVISIONS",
  DIVISIONS_LOADED: "DIVISIONS_LOADED",
  SET_SCHEDULE_SORT_ORDER: "SET_SCHEDULE_SORT_ORDER",
};

export const PlayerActionTypes = {
  GET_PLAYER: "GET_PLAYER",
  BASIC_SEARCH_PLAYER: "BASIC_SEARCH_PLAYER",
  BASIC_PLAYER_LOADED: "BASIC_PLAYER_LOADED",
  SEARCH_PLAYER: "SEARCH_PLAYER",
  ADD_PLAYER: "ADD_PLAYER",
  PLAYER_ADDED: "PLAYER_ADDED",
  REMOVE_PLAYER: "REMOVE_PLAYER",
  REMOVE_ALL_PLAYERS: "REMOVE_ALL_PLAYERS",
  PLAYER_LOADED: "PLAYER_LOADED",
  GET_SELECTED_PLAYERS: "GET_SELECTED_PLAYERS",
  SELECTED_PLAYERS_LOADED: "SELECTED_PLAYERS_LOADED",
  SELECT_SEASON_STATS_TYPE: "SELECT_SEASON_STATS_TYPE"
};

export const TeamActionTypes = {
};