import { getLogo } from '../../util/assets';

const defaultAppState = {
  loaded: false,
  players: [],
  roster: [],
}

const playerReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case 'GET_PLAYER':
      return {
        ...state,
      }
    case 'ADD_PLAYER':
      return {
        ...state,
        players: state.players.concat(action.payload),
      }
    case 'REMOVE_PLAYER':
      const newPlayers = state.players.filter(p => p.Id !== parseInt(action.payload.id))
      return {
        ...state,
        players: newPlayers
      }
    case 'ADD_TO_LINEUP':
      return {
        ...state,
        roster: state.roster.concat(action.payload.player),
      }
    case 'PLAYER_LOADED':
      return {
        ...state,
        player: action.payload,
      }
    case 'BASIC_PLAYER_LOADED':
      return {
        ...state,
        suggestions: action.payload.map((result) => {
          return {
            "title": result.fullName,
            "description": result.currentTeam.name,
            "image": getLogo(result.currentTeam.id),
            "id": result.id,
          }
        }),
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

export default playerReducer;