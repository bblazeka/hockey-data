import { axiosGraphQL } from "util/common";
import * as actionTypes from "./actionTypes";
import * as querySchemas from "./querySchemas";

export const getPlayer = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_PLAYER,
  });
  const player = (
    await axiosGraphQL.post("", {
      query: querySchemas.getBasicPlayer,
      variables: { id: parseInt(id) },
    })
  ).data.data.player;
  const queryString =
    player.primaryPosition.code === "G"
      ? querySchemas.getGoalie
      : querySchemas.getSkater;
  axiosGraphQL
    .post("", { query: queryString, variables: { id: parseInt(id) } })
    .then((response) => {
      dispatch({
        type: actionTypes.PLAYER_LOADED,
        payload: response.data.data.player,
      });
    });
};

export const searchBasicPlayer = (name) => (dispatch) => {
  dispatch({
    type: actionTypes.BASIC_SEARCH_PLAYER,
  });
  axiosGraphQL
    .post("", { query: querySchemas.getBasicPlayerByName, variables: { name } })
    .then((response) => {
      dispatch({
        type: actionTypes.BASIC_PLAYER_LOADED,
        payload: response.data.data.searchPlayerByName,
      });
    });
};

export const removePlayer = (id) => ({
  type: actionTypes.REMOVE_PLAYER,
  payload: {
    id,
  },
});

export const getSelectedPlayers =
  (selectedPlayerIds, seasonIdOption) => (dispatch) => {
    dispatch({
      type: actionTypes.GET_SELECTED_PLAYERS,
      payload: seasonIdOption,
    });
    const seasonId = parseInt(seasonIdOption.split("proj")[0]);
    const projectedStats = seasonIdOption.includes("proj");
    axiosGraphQL
      .post("", {
        query: querySchemas.getSelectedPlayers,
        variables: {
          playerIds: selectedPlayerIds.join(","),
          seasonId,
          projectedStats,
        },
      })
      .then((response) => {
        dispatch({
          type: actionTypes.SELECTED_PLAYERS_LOADED,
          payload: response.data.data.selectedPlayers,
        });
      });
  };
