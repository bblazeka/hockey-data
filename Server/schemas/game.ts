import { gql } from "apollo-server-lambda";

export const gameSchema = gql`
  type Game {
    gamePk: Int
    currentPeriod: Int
    currentPeriodOrdinal: String
    currentPeriodTimeRemaining: String
    ongoingGame: Boolean
    finished: Boolean
    percentage: Float
    date: String
    gameTime: String
    powerPlayStrength: String
    id: Int
    gameDate: Date
    gameType: String
    season: String
    venue: Venue
    teams: GameTeams
    officials: [GameOfficial]
    linescore: Linescore
    status: GameStatus
    home: Opponent
    away: Opponent
    opponent: Opponent
  }

  type GameTeams {
    home: GameTeam
    away: GameTeam
  }

  type GameTeam {
    team: Team
    skaters: [GamePlayer]
    goalies: [GamePlayer]
    coaches: [Coach]
    goals: Int
    shotsOnGoal: Int
  }

  type GamePlayer {
    person: Player
    jerseyNumber: Int
    position: Position
    stats: Stats
  }

  type GameStatus {
    abstractGameState: String
    codedGameState: String
    detailedState: String
    statusCode: String
  }

  type GamesBetweenTeams {
    team: Team
    opponent: Team
    score: ScoreBetweenTeams
    games: [Game]
  }

  type ScoreBetweenTeams {
    homeWins: Int
    awayWins: Int
    teamWins: Int
    opponentWins: Int
    teamGoals: Int
    opponentGoals: Int
    gameGoals: [GameGoals]
  }

  type GameGoals {
    name: String
    value: Int
  }
`;
