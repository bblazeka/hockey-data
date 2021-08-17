import { createSelector } from "reselect";

const selectAnalysis = (state) => state.analysis;

const selectGame = (state) => state.game;

const selectLeague = (state) => state.league;

const selectNews = (state) => state.news;

const selectPlayer = (state) => state.player;

const selectTeam = (state) => state.team;

const selectUtil = (state) => state.util;

export const selectTeamObject = createSelector(
  selectTeam,
  selectNews,
  selectLeague,
  selectUtil,
  (team, news, league, util) => {
    return {
      team: team.team,
      tweets: news.tweets,
      teams: team.teams,
      news: news.news,
      teamGames: league.teamGames,
      location: util.location,
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
    selectedPlayers: player.selectedPlayers,
    suggestedPlayers: player.suggestedPlayers,
  };
});

export const selectSchedule = createSelector(selectLeague, (league) => {
  return {
    schedule: league.schedule,
  };
});

export const selectHome = createSelector(
  selectGame,
  selectNews,
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
