export const GET_SCHEDULE = 'GET_SCHEDULE'
export const SCHEDULE_LOADED = 'SCHEDULE_LOADED'
export const GET_PREDICTION = 'GET_PREDICTION'
export const PREDICTION_LOADED = 'PREDICTION_LOADED'

export const getSchedule = (start,end) => ({
  type: GET_SCHEDULE,
  payload: {
    start,
    end,
  }
})