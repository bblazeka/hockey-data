import { gql } from "apollo-server-lambda";

export const querySchema = gql`
  scalar Date

  type Query {
    analysis: [TeamAnalysis]
    player(id: Int): Player
    searchPlayerByName(name: String): [Player]
    selectedPlayers: SelectedPlayers
    team(id: Int): Team
    teams: [Team]
    teamLocations: TeamLocations
    articles(query: String): [Article]
    tweets(query: String): [Tweet]
    twitterApiStatus: TwitterStats
    schedule(start: String, end: String): [ScheduleTeam]
    scheduleByTeam(id: Int, start: String, end: String): [Game]
    standings(season: String): [Record]
    divisionsWithTeams: [Division]
    gamesBetweenTeams(homeId: Int, awayId: Int): GamesBetweenTeams
    game(gameId: Int): Game
    todaysGames: [Game]
    geocode(query: String): [Location]
  }

  type Mutation {
    addSelectedPlayer(id: Int): SelectedPlayers
    deleteSelectedPlayer(id: Int): SelectedPlayers
    clearSelectedPlayers: SelectedPlayers
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

  type LineInt {
    x: String
    y: Int
  }
`;
