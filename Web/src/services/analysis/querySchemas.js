import gql from "graphql-tag";

export const getAnalysis = gql`
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
      skaterStats {
        id
        fullName
        stats {
          games
          goals
          assists
          points
          plusMinus
          timeOnIce
          shots
          hits
          blocked
          powerPlayGoals
          powerPlayPoints
          powerPlayTimeOnIce
          evenTimeOnIce
          penaltyMinutes
          faceOffPct
          shotPct
          gameWinningGoals
          overTimeGoals
          shortHandedGoals
          shortHandedTimeOnIce
          shifts
          timeOnIcePerGame
          shortHandedTimeOnIcePerGame
          powerPlayTimeOnIcePerGame
        }
        advancedStats {
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
          ppAssists
          ppGoals
          ppGoalsForPer60
          ppGoalsPer60
          ppIndividualSatFor
          ppIndividualSatForPer60
          ppPoints
          ppPointsPer60
          ppPrimaryAssists
          ppPrimaryAssistsPer60
          ppSecondaryAssists
          ppSecondaryAssistsPer60
          ppShootingPct
          ppShots
          ppShotsPer60
          ppTimeOnIce
          ppTimeOnIcePctPerGame
          ppTimeOnIcePerGame
        }
      }
      goalieStats {
        id
        fullName
        stats {
          timeOnIce
          ot
          shutouts
          wins
          losses
          saves
          powerPlaySaves
          shortHandedSaves
          evenSaves
          shortHandedShots
          evenShots
          powerPlayShots
          savePercentage
          goalAgainstAverage
          games
          gamesStarted
          shotsAgainst
          goalsAgainst
          powerPlaySavePercentage
          shortHandedSavePercentage
          evenStrengthSavePercentage
        }
        advancedStats {
          seasonId
          playerId
          goalieFullName
          gamesPlayed
          completeGamePct
          completeGames
          gamesStarted
          goalieFullName
          goalsAgainst
          goalsAgainstAverage
          goalsFor
          goalsForAverage
          incompleteGames
          qualityStart
          qualityStartsPct
          regulationLosses
          regulationWins
          savePct
          shootsCatches
          shotsAgainstPer60
          teamAbbrevs
          timeOnIce
        }
      }
    }
  }
`;
