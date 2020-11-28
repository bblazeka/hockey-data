const defaultAppState = {
  loaded: false,
  players: [],
  roster: [],
}

const leagueReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case 'GET_SCHEDULE':
      return {
        ...state,
        schedule: null
      }
    case 'SCHEDULE_LOADED':
      return {
        ...state,
        schedule: action.payload
      }
    case 'STANDINGS_LOADED':
      return {
        ...state,
        standings: action.payload
      }
    case 'GAME_LOADED':
      return {
        ...state,
        game: action.payload
      }
    case 'DROPDOWN_TEAMS_LOADED':
      return {
        ...state,
        dropdownTeams: action.payload
      }
    default:
      return state
  }
}

export default leagueReducer;