export const skaterStatsFragment = /* GraphQL */ `
  fragment SkaterStatsFragment on Stats {
    games
    goals
    assists
    points
    pim
    penaltyMinutes
    plusMinus
    faceOffPct
    shots
    hits
    blocked
    timeOnIce
    evenTimeOnIce
    evenTimeOnIceMinutes
    powerPlayTimeOnIce
    powerPlayTimeOnIceMinutes
    shortHandedTimeOnIce
    shortHandedTimeOnIceMinutes
    shotPct
    gameWinningGoals
    powerPlayGoals
    powerPlayAssists
    powerPlayPoints
    shortHandedGoals
    shortHandedPoints
  }
`;

export const goalieStatsFragment = /* GraphQL */ `
  fragment GoalieStatsFragment on Stats {
    games
    gamesStarted
    goalAgainstAverage
    savePercentage
    wins
    losses
    ot
    evenSaves
    powerPlaySaves
    shortHandedSaves
    shotsAgainst
    evenShots
    powerPlayShots
    shortHandedShots
    evenStrengthSavePercentage
    powerPlaySavePercentage
    shortHandedSavePercentage
    shutouts
    timeOnIce
  }
`;
