const defaultAppState = {
    loaded: false
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
                player: null
            }
        case 'PLAYER_LOADED':
            return {
                ...state,
                player: action.payload
            }
        case 'PREDICTION_LOADED':
            return {
                ...state,
                prediction: action.payload
            }
        default:
            return state
    }
}