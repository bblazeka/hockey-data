export const getAnalysis = /* GraphQL */ `
  query analysis {
    analysis {
      id
      leagueRank
      leagueHomeRank
      leagueRoadRank
      leagueL10Rank
      ppLeagueRank
      divisionRank
      divisionHomeRank
      divisionRoadRank
      divisionL10Rank
      ppDivisionRank
      points
      stats {
        title
        value
        description
      }
      regularSeasonStatRankings {
        wins
        losses
        ot
        pts
        ptPctg
        goalsPerGame
        goalsAgainstPerGame
        evGGARatio
        powerPlayPercentage
        powerPlayGoals
        powerPlayGoalsAgainst
        powerPlayOpportunities
      }
      rankingsGraph {
        x
        y
      }
      team {
        name
        colorScheme
      }
      lines {
        goalies {
          starter
          backup
        }
        lines {
          leftDefender
          rightDefender
          leftWing
          center
          rightWing
        }
        ppLines {
          leftDefender
          rightDefender
          leftWing
          center
          rightWing
        }
      }
      rosterStats {
        id
        abbrName
        fullName
        stats {
          games
          wins
          shutouts
          goals
          assists
          points
          plusMinus
        }
      }
      enhancedSkaterStats {
        seasonId
        playerId
        skaterFullName
        positionCode
        assists5v5
        assistsPer605v5
        gamesPlayed
        goals5v5
        goalsPer605v5
        netMinorPenaltiesPer60
        offensiveZoneStartPct5v5
        onIceShootingPct5v5
        points5v5
        pointsPer605v5
        primaryAssists5v5
        primaryAssistsPer605v5
        satPct
        satRelative5v5
        secondaryAssists5v5
        secondaryAssistsPer605v5
        shootingPct5v5
        timeOnIcePerGame5v5
      }
    }
  }
`;
