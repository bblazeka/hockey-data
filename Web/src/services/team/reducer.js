const defaultAppState = {
  loaded: false,
  players: [],
  roster: [],
}

const teamReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case 'GET_TEAM':
      return {
        ...state,
        team: null
      }
    case 'TEAM_LOADED':
      return {
        ...state,
        team: action.payload
      }
    case 'TEAMS_LOADED':
      return {
        ...state,
        teams: action.payload
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

export default teamReducer;