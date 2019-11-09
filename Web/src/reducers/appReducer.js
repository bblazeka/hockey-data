const defaultAppState = {
    loaded: false,
    players: [],
    roster: [],
}

export default (state = defaultAppState, action) => {
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
        case 'PLAYER_LOADED':
            return {
                ...state,
                player: action.payload,
            }
        case 'BASIC_PLAYER_LOADED':
            return {
                ...state,
                roster: state.roster.concat(action.payload[0]),
            }
        case 'PREDICTION_LOADED':
            return {
                ...state,
                prediction: action.payload
            }
        case 'NEWS_LOADED':
            return {
                ...state,
                news: action.payload
            }
        default:
            return state
    }
}