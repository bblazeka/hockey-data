export const getAnalysis = /* GraphQL */ `
    query analysis {
        analysis { 
          id,
          leagueRank,
          leagueHomeRank,
          leagueRoadRank,
          leagueL10Rank,
          ppLeagueRank,
          divisionRank,
          divisionHomeRank,
          divisionRoadRank,
          divisionL10Rank,
          ppDivisionRank,
          points,
          stats { title, value, description },
          regularSeasonStatRankings { wins, losses, ot, pts, ptPctg, goalsPerGame, goalsAgainstPerGame, evGGARatio, powerPlayPercentage, powerPlayGoals, powerPlayGoalsAgainst, powerPlayOpportunities },
          rankingsGraph { x, y }
          team { name, colorScheme },
          lines {
                goalies { starter, backup },
                lines { leftDefender, rightDefender, leftWing, center, rightWing },
                ppLines { leftDefender, rightDefender, leftWing, center, rightWing }
              },
          rosterStats {
            id,
            abbrName,
            fullName,
            stats {
              games,
              wins,
              shutouts,
              goals,
              assists,
              points,
              plusMinus
            }
          }
        }
    }
  `;