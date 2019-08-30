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
        default:
            return state
    }
}