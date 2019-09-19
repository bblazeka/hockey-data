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

export const getSchedule = (start,end) => ({
  type: GET_SCHEDULE,
  payload: {
    start,
    end,
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