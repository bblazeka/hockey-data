import { gql } from "apollo-server-lambda";

export const playerSchema = gql`
  type Player {
    id: Int
    description: String
    abbrName: String
    fullName: String
    currentAge: Int
    jerseyNumber: Int
    active: Boolean
    alternateCaptain: Boolean
    birthCity: String
    birthDate: String
    captain: Boolean
    currentTeam: Team
    firstName: String
    lastName: String
    height: Int
    primaryNumber: Int
    primaryPosition: Position
    positionName: String
    rookie: Boolean
    rosterStatus: String
    shootsCatches: String
    weight: Int
    nationality: String
    capHit: String
    stats: Stats
    advancedStats: AdvancedStats
    averageStats: AverageStats
    nhlStats: StatsCollection
    careerStats: StatsCollection
  }

  type StatsCollection {
    totalGames: Int
    totalGoals: Int
    totalAssists: Int
    totalPoints: Int
    totalGamesStarted: Int
    totalWins: Int
    seasonSums: [SeasonSum]
    stats: [SeasonStats]
  }

  type SeasonStats {
    season: String
    team: Team
    league: League
    stat: Stats
  }

  type DetailedStats {
    byMonth: [MonthlyStats]
    gameLog: [GameLogStats]
  }

  type MonthlyStats {
    season: String
    stat: Stats
    month: Int
  }

  type GameLogStats {
    season: String
    stat: Stats
    team: Team
    opponent: Team
    date: String
    isHome: Boolean
    isWin: Boolean
    isOT: Boolean
    game: Game
  }

  type Stats {
    games: Int
    timeOnIce: String
    # skater props
    goals: Int
    assists: Int
    points: Int
    pim: Int
    penaltyMinutes: Int
    plusMinus: Int
    shots: Int
    hits: Int
    blocked: Int
    faceOffPct: Float
    faceOffWins: Int
    faceoffTaken: Int
    evenTimeOnIce: String
    evenTimeOnIceMinutes: Int
    powerPlayTimeOnIce: String
    powerPlayTimeOnIceMinutes: Int
    shotPct: Float
    overTimeGoals: Int
    gameWinningGoals: Int
    powerPlayGoals: Int
    powerPlayAssists: Int
    powerPlayPoints: Int
    shortHandedGoals: Int
    shortHandedAssists: Int
    shortHandedPoints: Int
    shortHandedTimeOnIce: String
    shortHandedTimeOnIceMinutes: Int
    shifts: Int
    # goalie props
    gamesStarted: Int
    goalAgainstAverage: Float
    savePercentage: Float
    wins: Int
    losses: Int
    ot: Int
    saves: Int
    evenSaves: Int
    goalsAgainst: Int
    powerPlaySaves: Int
    shortHandedSaves: Int
    shotsAgainst: Int
    evenShots: Int
    powerPlayShots: Int
    shortHandedShots: Int
    shortHandedShotsAgainst: Int
    evenShotsAgainst: Int
    evenStrengthSavePercentage: Float
    powerPlaySavePercentage: Float
    shortHandedSavePercentage: Float
    shutouts: Int
    # (semi)common
    timeOnIcePerGame: String
    evenTimeOnIcePerGame: String
    shortHandedTimeOnIcePerGame: String
    powerPlayTimeOnIcePerGame: String
  }

  type AverageStats {
    timeOnIce: String
    # skater props
    goals: Float
    assists: Float
    points: Float
    pim: Float
    penaltyMinutes: Float
    plusMinus: Float
    shots: Float
    hits: Float
    blocked: Float
    faceOffPct: Float
    faceOffWins: Float
    faceoffTaken: Float
    evenTimeOnIce: String
    evenTimeOnIceMinutes: Float
    powerPlayTimeOnIce: String
    powerPlayTimeOnIceMinutes: Float
    shotPct: Float
    overTimeGoals: Float
    gameWinningGoals: Float
    powerPlayGoals: Float
    powerPlayAssists: Float
    powerPlayPoints: Float
    shortHandedGoals: Float
    shortHandedAssists: Float
    shortHandedPoints: Float
    shortHandedTimeOnIce: String
    shortHandedTimeOnIceMinutes: Float
    shifts: Int
    # goalie props
    goalAgainstAverage: Float
    savePercentage: Float
    wins: Float
    losses: Float
    ot: Float
    saves: Float
    evenSaves: Float
    goalsAgainst: Float
    powerPlaySaves: Float
    shortHandedSaves: Float
    shotsAgainst: Float
    evenShots: Float
    powerPlayShots: Float
    shortHandedShots: Float
    shortHandedShotsAgainst: Float
    evenShotsAgainst: Float
    evenStrengthSavePercentage: Float
    powerPlaySavePercentage: Float
    shortHandedSavePercentage: Float
    shutouts: Float
    # (semi)common
    timeOnIcePerGame: String
    evenTimeOnIcePerGame: String
    shortHandedTimeOnIcePerGame: String
    powerPlayTimeOnIcePerGame: String
  }

  type SeasonSum {
    season: String
    games: Int
    wins: Int
    goals: Int
    assists: Int
  }

  type League {
    id: Int
    name: String
  }

  type Position {
    code: String
    name: String
    type: String
    abbreviation: String
  }

  type SelectedPlayers {
    skaters: [Player]
    goalies: [Player]
  }
`;
