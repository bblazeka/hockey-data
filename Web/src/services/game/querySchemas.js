export function getGamesBetweenTeams(homeId, awayId) {
  return `{
    gamesBetweenTeams(homeId: ${homeId}, awayId: ${awayId}){
      score { homeWins, homeGoals, awayWins, awayGoals },
      games {
        gamePk,
        gameDate,
        gameType,
        season,
        home {
          score,
          leagueRecord { wins, losses, ot },
          team { id, name }
        },
        away { 
          score,
          leagueRecord { wins, losses, ot },
          team { id, name }
        }
      }
    }
  }`;
}

export function getGame(id) {
  return `{
    game(gameId: ${id}){ 
        id,
        gameDate,
        gameType,
        percentage,
        venue { id, name },
        season,
      teams {
        home {
          skaters {
            jerseyNumber,
            person { id, fullName },
            position { code, name }
            stats {
              skaterStats { timeOnIce, assists, goals, points, shots, hits, blocked, plusMinus, penaltyMinutes, faceOffWins, faceoffTaken, powerPlayGoals, powerPlayAssists, shortHandedGoals, shortHandedAssists, shortHandedTimeOnIce, powerPlayTimeOnIce }
            }
          },
          goalies {
            jerseyNumber,
            person { id, fullName },
            position { code, name }
            stats { 
              goalieStats  { timeOnIce, shots, saves, savePercentage }
            }
          },
          team { id, name },
          coaches {
            person { fullName },
            position { code, name, type }
          }
        }
        away {
          skaters {
            jerseyNumber,
            person { id, fullName },
            position { code, name }
            stats {
              skaterStats { timeOnIce, assists, goals, points, shots, hits, blocked, plusMinus, penaltyMinutes, faceOffWins, faceoffTaken, powerPlayGoals, powerPlayAssists, shortHandedGoals, shortHandedAssists, shortHandedTimeOnIce, powerPlayTimeOnIce }
            }
          },
          goalies {
            jerseyNumber,
            person { id, fullName },
            position { code, name }
            stats { 
              goalieStats  { timeOnIce, shots, saves, savePercentage }
            }
          },
          team { id, name },
          coaches {
            person { fullName },
            position { code, name, type }
          }
        }
      }
      officials {
        official { id, fullName },
        officialType
      },
      linescore {
        currentPeriodOrdinal,
        currentPeriodTimeRemaining,
        teams {
          home { goals, shotsOnGoal },
          away { goals, shotsOnGoal }
        }
        periods {
          num,
          home { goals, shotsOnGoal },
          away { goals, shotsOnGoal }
        }
      }
    }
  }`;
}

export function getTodaysGames() {
  return `{
    todaysGames  {
      gamePk,
      gameTime,
      currentPeriod,
      currentPeriodOrdinal,
      currentPeriodTimeRemaining,
      ongoingGame,
      finished,
  teams {
      home {
        team {
          id, name
        }
        goals,
        shotsOnGoal,
      },
    away {
        team {
          id, name
        }
        goals,
        shotsOnGoal,
    }
    }
}
  }`;
}