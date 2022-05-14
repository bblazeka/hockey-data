import { axiosGraphQL } from "util/common";
import { GameActionTypes } from "./actionTypes";
import { getGamesBetweenTeams, getGame as getGameQuery } from "services/querySchemas/game";

export const findGames = (teamId, opponentId, season) => (dispatch) => {
  dispatch({
    type: GameActionTypes.GET_GAMES,
    payload: {
      teamId,
      opponentId,
      season
    }
  });
  axiosGraphQL
    .post("", {
      query: getGamesBetweenTeams,
      variables: { teamId, opponentId, season },
    })
    .then((response) => {
      if (!response.data.data.gamesBetweenTeams.games[0]) {
        dispatch({
          type: GameActionTypes.GAMES_NOT_FOUND,
        });
      } else {
        dispatch({
          type: GameActionTypes.GAMES_FOUND,
          payload: response.data.data.gamesBetweenTeams,
        });
      }
    });
};

export const getGame = (gameId) => (dispatch) => {
  dispatch({
    type: GameActionTypes.GET_GAME,
  });
  axiosGraphQL
    .post("", {
      query: getGameQuery,
      variables: { gameId: parseInt(gameId) },
    })
    .then((response) => {
      dispatch({
        type: GameActionTypes.GAME_LOADED,
        payload: response.data.data.game,
      });
    });
};
