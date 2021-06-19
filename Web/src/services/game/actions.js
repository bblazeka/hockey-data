import { axiosGraphQL, IsNullOrUndefined } from '../../util/common';
import * as actionTypes from './actionTypes';
import * as querySchemas from './querySchemas';


export const findGames = (homeId, awayId) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_GAMES,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getGamesBetweenTeams, variables: { homeId, awayId } })
    .then(response => {
      if (IsNullOrUndefined(response.data.data.gamesBetweenTeams.games[0])) {
        dispatch({
          type: actionTypes.GAMES_NOT_FOUND,
        });
      }
      else {
        dispatch({
          type: actionTypes.GAMES_FOUND,
          payload: response.data.data.gamesBetweenTeams
        });
      }
    });
};

export const getGame = (gameId) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_GAME,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getGame, variables: { gameId: parseInt(gameId) } })
    .then(response => {
      dispatch({
        type: actionTypes.GAME_LOADED,
        payload: response.data.data.game
      });
    });
};

export const getGamesToday = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_GAMES_TODAY,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getTodaysGames })
    .then(response => {
      dispatch({
        type: actionTypes.GAMES_TODAY_LOADED,
        payload: response.data.data.todaysGames
      });
    });
};