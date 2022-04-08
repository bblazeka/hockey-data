import { axiosGraphQL } from "util/common";
import {PlayerActionTypes} from "./actionTypes";
import {getBasicPlayer, getSkater, getGoalie, getBasicPlayerByName, getSelectedPlayers as getSelectedPlayersQuery} from "services/querySchemas/player";

export const getPlayer = (id) => async (dispatch) => {
  dispatch({
    type: PlayerActionTypes.GET_PLAYER,
  });
  const player = (
    await axiosGraphQL.post("", {
      query: getBasicPlayer,
      variables: { id: parseInt(id) },
    })
  ).data.data.player;
  const queryString =
    player.primaryPosition.code === "G"
      ? getGoalie
      : getSkater;
  axiosGraphQL
    .post("", { query: queryString, variables: { id: parseInt(id) } })
    .then((response) => {
      dispatch({
        type: PlayerActionTypes.PLAYER_LOADED,
        payload: response.data.data.player,
      });
    });
};

export const searchBasicPlayer = (name) => (dispatch) => {
  dispatch({
    type: PlayerActionTypes.BASIC_SEARCH_PLAYER,
  });
  axiosGraphQL
    .post("", { query: getBasicPlayerByName, variables: { name } })
    .then((response) => {
      dispatch({
        type: PlayerActionTypes.BASIC_PLAYER_LOADED,
        payload: response.data.data.searchPlayerByName,
      });
    });
};

export const removePlayer = (id) => ({
  type: PlayerActionTypes.REMOVE_PLAYER,
  payload: {
    id,
  },
});

export const getSelectedPlayers =
  (selectedPlayerIds, seasonIdOption) => (dispatch) => {
    dispatch({
      type: PlayerActionTypes.GET_SELECTED_PLAYERS,
      payload: seasonIdOption,
    });
    const seasonId = parseInt(seasonIdOption.split("proj")[0]);
    const projectedStats = seasonIdOption.includes("proj");
    axiosGraphQL
      .post("", {
        query: getSelectedPlayersQuery,
        variables: {
          playerIds: selectedPlayerIds.join(","),
          seasonId,
          projectedStats,
        },
      })
      .then((response) => {
        dispatch({
          type: PlayerActionTypes.SELECTED_PLAYERS_LOADED,
          payload: response.data.data.selectedPlayers,
        });
      });
  };
