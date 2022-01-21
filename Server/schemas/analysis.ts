import { gql } from "apollo-server-lambda";

export const analysisSchema = gql`
  type TeamAnalysis {
    team: Team
    id: Int
    lastUpdated: String
    leagueRank: Int
    leagueHomeRank: Int
    leagueRoadRank: Int
    leagueL10Rank: Int
    ppLeagueRank: Int
    divisionRank: Int
    divisionHomeRank: Int
    divisionRoadRank: Int
    divisionL10Rank: Int
    ppDivisionRank: Int
    points: Int
    leagueRecord: LeagueRecord
    regularSeasonStatRankings: RegularSeasonRankings
    statsSingleSeason: StatsSingleSeason
    lines: Lines
    rosterStats: [Player]
    skaterStats: [Player]
    goalieStats: [Player]
  }

  type StatsSingleSeason {
    gamesPlayed: Int
    wins: Int
    losses: Int
    ot: Int
    pts: Int
    ptPctg: Float
    goalsPerGame: Float
    goalsAgainstPerGame: Float
    evGGARatio: Float
    powerPlayPercentage: Float
    powerPlayGoals: Int
    powerPlayGoalsAgainst: Int
    powerPlayOpportunities: Int
    penaltyKillPercentage: Float
    shotsPerGame: Float
    shotsAllowed: Float
    winScoreFirst: Float
    winOppScoreFirst: Float
    winLeadFirstPer: Float
    winLeadSecondPer: Float
    winOutshootOpp: Float
    winOutshotByOpp: Float
    faceOffsTaken: Int
    faceOffsWon: Int
    faceOffsLost: Int
    faceOffWinPercentage: Float
    shootingPctg: Float
    savePctg: Float
  }

  type RegularSeasonRankings {
    gamesPlayed: Int
    wins: Int
    losses: Int
    ot: Int
    pts: Int
    ptPctg: Int
    goalsPerGame: Int
    goalsAgainstPerGame: Int
    evGGARatio: Int
    powerPlayPercentage: Int
    powerPlayGoals: Int
    powerPlayGoalsAgainst: Int
    powerPlayOpportunities: Int
    penaltyKillPercentage: Int
    shotsPerGame: Int
    shotsAllowed: Int
    winScoreFirst: Int
    winOppScoreFirst: Int
    winLeadFirstPer: Int
    winLeadSecondPer: Int
    winOutshootOpp: Int
    winOutshotByOpp: Int
    faceOffsTaken: Int
    faceOffsWon: Int
    faceOffsLost: Int
    faceOffWinPercentage: Int
    shootingPctRank: Int
    savePctRank: Int
  }

  type AdvancedStats {
    seasonId: Int
    playerId: Int
    gamesPlayed: Int
    # skaters
    skaterFullName: String
    positionCode: String
    assists5v5: Int
    assistsPer605v5: Float
    goals5v5: Int
    goalsPer605v5: Float
    netMinorPenaltiesPer60: Float
    offensiveZoneStartPct5v5: Float
    onIceShootingPct5v5: Float
    points5v5: Int
    pointsPer605v5: Float
    primaryAssists5v5: Int
    primaryAssistsPer605v5: Float
    satPct: Float
    satRelative5v5: Float
    secondaryAssists5v5: Int
    secondaryAssistsPer605v5: Float
    shootingPct5v5: Float
    timeOnIcePerGame5v5: Float
    ppAssists: Int
    ppGoals: Int
    ppGoalsForPer60: Float
    ppGoalsPer60: Float
    ppIndividualSatFor: Int
    ppIndividualSatForPer60: Float
    ppPoints: Int
    ppPointsPer60: Float
    ppPrimaryAssists: Int
    ppPrimaryAssistsPer60: Float
    ppSecondaryAssists: Int
    ppSecondaryAssistsPer60: Float
    ppShootingPct: Float
    ppShots: Int
    ppShotsPer60: Float
    ppTimeOnIce: Int
    ppTimeOnIcePctPerGame: Float
    ppTimeOnIcePerGame: Float
    # goalies
    completeGamePct: Float
    completeGames: Int
    gamesStarted: Int
    goalieFullName: String
    goalsAgainst: Int
    goalsAgainstAverage: Float
    goalsFor: Int
    goalsForAverage: Float
    incompleteGames: Int
    lastName: String
    qualityStart: Int
    qualityStartsPct: Float
    regulationLosses: Int
    regulationWins: Int
    savePct: Float
    shootsCatches: String
    shotsAgainstPer60: Float
    teamAbbrevs: String
    timeOnIce: Int
  }
`;
