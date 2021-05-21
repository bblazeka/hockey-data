import { axiosGraphQL, IsNullOrUndefined } from '../../util/common';
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
      });
    });
};

export const getStandings = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_STANDINGS,
  });
  axiosGraphQL
  .post('', { query: querySchemas.getStandings('20202021') })
  .then(response => {
    dispatch({
      type: actionTypes.STANDINGS_LOADED,
      payload: response.data.data.standings
    });
  });
};

export const findGames = (homeId, awayId) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_GAMES,
  });
  axiosGraphQL
  .post('', { query: querySchemas.getGamesBetweenTeams(homeId, awayId) })
  .then(response => {
    if (IsNullOrUndefined(response.data.data.gamesBetweenTeams[0]))
    {
      dispatch({
        type: actionTypes.GAMES_NOT_FOUND,
      });
    }
    else
    {
      dispatch({
        type: actionTypes.GAMES_FOUND,
        payload: response.data.data.gamesBetweenTeams
      });
    }
  });
};

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
    });
  });
};

export const getTeamSchedule = (id, start, end) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TEAM_SCHEDULE,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getTeamSchedule(id, start, end) })
    .then(response => {
      dispatch({
        type: actionTypes.TEAM_SCHEDULE_LOADED,
        payload: response.data.data.scheduleByTeam
      });
    });
};

export const getGamesToday = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_GAMES_TODAY,
  });
  axiosGraphQL
  .post('', { query: querySchemas.getTodaysGames() })
  .then(response => {
    dispatch({
      type: actionTypes.GAMES_TODAY_LOADED,
      payload: response.data.data.todaysGames
    });
  });
};