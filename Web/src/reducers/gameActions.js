import { axiosGraphQL } from "util/common";
import { GameActionTypes } from "./actionTypes";
import { getGamesBetweenTeams } from "services/querySchemas/game";

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