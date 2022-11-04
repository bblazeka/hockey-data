import { createSelector } from "reselect";

const selectAnalysis = (state) => state.analysis;

const selectGame = (state) => state.game;

const selectLeague = (state) => state.league;

const selectPlayer = (state) => state.player;

export const selectAnalysisObject = createSelector(
  selectAnalysis,
  (analysis) => {
    return {
      analysis: analysis.analysis,
    };
  }
);

export const selectSelectedPlayers = createSelector(selectPlayer, (player) => {
  return {
    loading: player.loadingSelectedPlayers,
    selectedPlayers: player.selectedPlayers,
    suggestions: player.suggestions,
    loadingSearchResults: player.loadingSearchResults,
    selectedPlayersOption: player.selectedPlayersOption,
  };
});

export const selectSchedule = createSelector(selectLeague, (league) => {
  return {
    schedule: league.schedule,
    scheduleSortOrder: league.scheduleSortOrder
  };
});

export const selectApp = createSelector(
  selectLeague,
  (league) => {
    return {
      divisionsWithTeams: league.divisionsWithTeams,
    };
  }
);

export const selectGameData = createSelector(selectGame, (game) => ({
  game: game.game,
  loading: game.loading,
}));

export const selectGameList = createSelector(
  selectGame,
  (game) => ({
    teamId: game.teamId,
    opponentId: game.opponentId,
    season: game.season,
    gamesBetweenTeams: game.gamesBetweenTeams,
    loading: game.loading,
  })
);

export const selectPlayerData = createSelector(
  selectPlayer,
  (player) => ({
    player: player.player,
    suggestions: player.suggestions,
  })
);
