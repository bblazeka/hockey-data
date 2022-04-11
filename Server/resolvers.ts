import {
  analysisResolvers,
  gameResolvers,
  leagueResolvers,
  miscResolvers,
  playerResolvers,
  teamResolvers,
} from "./services";

const funcWrapper = (functionName) => (parent, args, context, info) => {
  return functionName(args, context);
};

export function getResolvers() {
  const resolvers = {
    Query: {
      analysis: funcWrapper(analysisResolvers.getAnalysis),
      teamAnalysis: funcWrapper(analysisResolvers.getTeamAnalysis),
      game: funcWrapper(gameResolvers.getGame),
      gamesBetweenTeams: funcWrapper(gameResolvers.gamesBetweenTeams),
      playerDetailedStats: funcWrapper(playerResolvers.getPlayerDetailedStats),
      dailyGames: funcWrapper(gameResolvers.getDailyGames),
      team: funcWrapper(teamResolvers.getTeam),
      teams: funcWrapper(teamResolvers.getActiveTeams),
      teamLocations: funcWrapper(teamResolvers.getTeamLocations),
      player: funcWrapper(playerResolvers.getPlayer),
      searchPlayerByName: funcWrapper(playerResolvers.getPlayerByName),
      selectedPlayers: funcWrapper(playerResolvers.getSelectedPlayers),
      articles: funcWrapper(miscResolvers.getArticles),
      tweets: funcWrapper(miscResolvers.getTweets),
      twitterApiStatus: funcWrapper(miscResolvers.getTwitterApiStatus),
      schedule: funcWrapper(leagueResolvers.getSchedule),
      scheduleByTeam: funcWrapper(teamResolvers.getTeamSchedule),
      standings: funcWrapper(leagueResolvers.getStandings),
      divisionsWithTeams: funcWrapper(leagueResolvers.divisionsWithTeams),
      geocode: funcWrapper(miscResolvers.geocode),
    },
    /*Mutation: {
      addSelectedPlayer: funcWrapper(playerResolvers.addSelectedPlayer),
      deleteSelectedPlayer: funcWrapper(playerResolvers.deleteSelectedPlayer),
      clearSelectedPlayers: funcWrapper(playerResolvers.clearSelectedPlayers),
    },*/
  };
  return resolvers;
}
