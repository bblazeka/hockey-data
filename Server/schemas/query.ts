import { gql } from "apollo-server-lambda";

export const querySchema = gql`
  scalar Date

  type Query {
    analysis: [TeamAnalysis]
    teamAnalysis(teamId: Int): TeamAnalysis
    player(id: Int): Player
    playerDetailedStats(id: Int, seasonId: String): DetailedStats
    searchPlayerByName(name: String): [Player]
    selectedPlayers(
      playerIds: String
      seasonId: Int
      projectedStats: Boolean
    ): SelectedPlayers
    team(id: Int): Team
    teams: [Team]
    teamLocations: TeamLocations
    articles(query: String): [Article]
    tweets(query: String): [Tweet]
    twitterApiStatus: TwitterStats
    schedule(start: String, end: String): [ScheduleTeam]
    scheduleByTeam(id: Int, start: String, end: String): [Game]
    divisionsWithTeams: [Division]
    gamesBetweenTeams(
      teamId: Int
      opponentId: Int
      season: String
    ): GamesBetweenTeams
    dailyGames(dateISO: String): [Game]
  }

  type Mutation {
    addSelectedPlayer(id: Int, seasonId: Int): SelectedPlayers
    deleteSelectedPlayer(id: Int, seasonId: Int): SelectedPlayers
    clearSelectedPlayers(seasonId: Int): SelectedPlayers
  }

  type Venue {
    id: Int
    name: String
    city: String
    description: String
    timeZone: TimeZone
  }

  type TimeZone {
    id: String
    offset: Int
    tz: String
  }
`;
