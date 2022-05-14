import { createSelector } from "reselect";

const selectAnalysis = (state) => state.analysis;

const selectGame = (state) => state.game;

const selectLeague = (state) => state.league;

const selectMisc = (state) => state.misc;

const selectPlayer = (state) => state.player;

const selectTeam = (state) => state.team;

export const selectTeamObject = createSelector(
  selectTeam,
  selectMisc,
  selectLeague,
  (team, misc, league) => {
    return {
      team: team.team,
      tweets: misc.tweets,
      teams: team.teams,
      news: misc.news,
      teamGames: league.teamGames,
      location: misc.location,
    };
  }
);

export const selectAnalysisObject = createSelector(
  selectAnalysis,
  (analysis) => {
    return {
      analysis: analysis.analysis,
    };
  }
);

export const selectStandings = createSelector(selectLeague, (league) => {
  return {
    standings: league.standings,
  };
});

export const selectLocations = createSelector(selectTeam, (team) => {
  return {
    locations: team.locations,
  };
});

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
  selectTeam,
  selectLeague,
  (team, league) => {
    return {
      teams: team.teams,
      divisionsWithTeams: league.divisionsWithTeams,
    };
  }
);

export const selectHome = createSelector(
  selectGame,
  selectMisc,
  (game, news) => {
    return {
      homeNews: news.news,
      loadingNews: news.loadingNews,
      tweets: news.tweets,
      loadingTweets: news.loadingTweets,
      games: game.gamesToday,
    };
  }
);

export const selectGameData = createSelector(selectGame, (game) => ({
  game: game.game,
  loading: game.loading,
}));

export const selectGameList = createSelector(
  selectGame,
  selectTeam,
  (game, team) => ({
    teamId: game.teamId,
    opponentId: game.opponentId,
    season: game.season,
    gamesBetweenTeams: game.gamesBetweenTeams,
    dropdownTeams: team.dropdownTeams,
    loading: game.loading,
    loadingTeams: team.loading,
  })
);

export const selectPlayerData = createSelector(
  selectPlayer,
  selectMisc,
  (player, misc) => ({
    player: player.player,
    suggestions: player.suggestions,
    tweets: misc.tweets,
    news: misc.news,
    loadingTweets: misc.loadingTweets,
  })
);
