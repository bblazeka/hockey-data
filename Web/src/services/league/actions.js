import { axiosGraphQL } from '../../util/common';
import * as actionTypes from './actionTypes';
import * as querySchemas from './querySchemas';


export const getSchedule = (start, end) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_SCHEDULE,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getSchedule(start, end) })
    .then(response => {
      dispatch({
        type: actionTypes.SCHEDULE_LOADED,
        payload: response.data.data.schedule
      })
    });
}

export const getStandings = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_STANDINGS,
  });
  axiosGraphQL
  .post('', { query: querySchemas.getStandings("20202021") })
  .then(response => {
    dispatch({
      type: actionTypes.STANDINGS_LOADED,
      payload: response.data.data.standings
    })
  });
}

export const findGame = (homeId, awayId) => (dispatch) => {
  dispatch({
    type: actionTypes.FIND_GAME,
  });
  axiosGraphQL
  .post('', { query: querySchemas.getGamesBetweenTeams(homeId, awayId) })
  .then(response => {
    dispatch(getGame(response.data.data.gamesBetweenTeams[0].gamePk))
    dispatch({
      type: actionTypes.GAME_FOUND,
      payload: response.data.data.gamesBetweenTeams[0]
    })
  });
}

export const getGame = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_GAME,
  });
  axiosGraphQL
  .post('', { query: querySchemas.getGame(id) })
  .then(response => {
    dispatch({
      type: actionTypes.GAME_LOADED,
      payload: response.data.data.game
    })
  });
}