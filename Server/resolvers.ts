import * as analysis from "./services/analysis";
import * as game from "./services/game";
import * as team from "./services/team";
import * as news from "./services/news";
import * as league from "./services/league";
import * as player from "./services/player";
import * as util from "./services/util";

const funcWrapper = (functionName) => (parent, args, context, info) => {
  return functionName(args);
};

export function getResolvers() {
  const resolvers = {
    Query: {
      analysis: funcWrapper(analysis.getAnalysis),
      game: funcWrapper(game.getGame),
      gamesBetweenTeams: funcWrapper(game.gamesBetweenTeams),
      todaysGames: funcWrapper(game.getTodaysGames),
      team: funcWrapper(team.getTeam),
      teams: funcWrapper(team.getActiveTeams),
      teamLocations: funcWrapper(team.getTeamLocations),
      player: funcWrapper(player.getPlayer),
      searchPlayerByName: funcWrapper(player.getPlayerByName),
      selectedPlayers: funcWrapper(player.getSelectedPlayers),
      articles: funcWrapper(news.getArticles),
      tweets: funcWrapper(news.getTweets),
      twitterApiStatus: funcWrapper(news.getTwitterApiStatus),
      schedule: funcWrapper(league.getSchedule),
      scheduleByTeam: funcWrapper(team.getTeamSchedule),
      standings: funcWrapper(league.getStandings),
      divisionsWithTeams: funcWrapper(league.divisionsWithTeams),
      geocode: funcWrapper(util.geocode),
    },
    Mutation: {
      addSelectedPlayer: funcWrapper(player.addSelectedPlayer),
      deleteSelectedPlayer: funcWrapper(player.deleteSelectedPlayer),
      clearSelectedPlayers: funcWrapper(player.clearSelectedPlayers),
    },
  };
  return resolvers;
}
