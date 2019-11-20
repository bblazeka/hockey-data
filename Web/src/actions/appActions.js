export const GET_PREDICTION = 'GET_PREDICTION'
export const PREDICTION_LOADED = 'PREDICTION_LOADED'
export const GET_SCHEDULE = 'GET_SCHEDULE'
export const SCHEDULE_LOADED = 'SCHEDULE_LOADED'
export const GET_STANDINGS = 'GET_STANDINGS'
export const STANDINGS_LOADED = 'STANDINGS_LOADED'
export const GET_TEAM = 'GET_TEAM'
export const TEAM_LOADED = 'TEAM_LOADED'
export const GET_TEAMS = 'GET_TEAMS'
export const TEAMS_LOADED = 'TEAMS_LOADED'
export const POPULATE_DATABASE = 'POPULATE_DATABASE'
export const UPDATE_DATABASE = 'UPDATE_DATABASE'
export const GET_PLAYER = 'GET_PLAYER'
export const BASIC_SEARCH_PLAYER = 'BASIC_SEARCH_PLAYER'
export const BASIC_PLAYER_LOADED = 'BASIC_PLAYER_LOADED'
export const SEARCH_PLAYER = 'SEARCH_PLAYER'
export const ADD_PLAYER = 'ADD_PLAYER'
export const REMOVE_PLAYER = 'REMOVE_PLAYER'
export const PLAYER_LOADED = 'PLAYER_LOADED'
export const GET_NEWS = 'GET_NEWS'
export const NEWS_LOADED = 'NEWS_LOADED'
export const ADD_TO_LINEUP = 'ADD_TO_LINEUP'
export const GET_GAME = 'GET_GAME'
export const GAME_LOADED = 'GAME_LOADED'

export const getNews = () => ({
  type: GET_NEWS,
})

export const getSchedule = (start,end) => ({
  type: GET_SCHEDULE,
  payload: {
    start,
    end,
  }
})

export const getPlayer = (id) => ({
  type: GET_PLAYER,
  payload: {
    id,
  }
})

export const getStandings = () => ({
  type: GET_STANDINGS,
})

export const getTeam = (id) => ({
  type: GET_TEAM,
  payload: {
    id,
  }
})

export const getTeams = () => ({
  type: GET_TEAMS,
})

export const populateDatabase = () => ({
  type: POPULATE_DATABASE,
})

export const updateDatabase = () => ({
  type: UPDATE_DATABASE,
})

export const searchBasicPlayer = (name) => ({
  type: BASIC_SEARCH_PLAYER,
  payload: {
    name,
  }
})

export const searchPlayer = (name, individual) => ({
  type: SEARCH_PLAYER,
  payload: {
    name,
    individual,
  }
})

export const removePlayer = (id) => ({
  type: REMOVE_PLAYER,
  payload: {
    id,
  }
})

export const getPrediction = () => ({
  type: GET_PREDICTION,
})

export const addToLineup = (player) => ({
  type: ADD_TO_LINEUP,
  payload: {
    player,
  }
})

export const getGame = (id) => ({
  type: GET_GAME,
  payload: {
    id,
  }
})