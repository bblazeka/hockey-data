export const GET_PREDICTION = 'GET_PREDICTION'
export const PREDICTION_LOADED = 'PREDICTION_LOADED'
export const GET_SCHEDULE = 'GET_SCHEDULE'
export const SCHEDULE_LOADED = 'SCHEDULE_LOADED'
export const GET_STANDINGS = 'GET_STANDINGS'
export const STANDINGS_LOADED = 'STANDINGS_LOADED'

export const getSchedule = (start,end) => ({
  type: GET_SCHEDULE,
  payload: {
    path: "http://localhost:50540/api/league/schedule/"+start+"?enddate="+end,
  }
})

export const getStandings = () => ({
  type: GET_STANDINGS,
  payload: {
    path: "http://localhost:50540/api/league/standings",
  }
})