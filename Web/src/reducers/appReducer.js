const defaultAppState = {
    loaded: false
}

export default (state = defaultAppState, action) => {
    switch (action.type) {
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
        default:
            return state
    }
}