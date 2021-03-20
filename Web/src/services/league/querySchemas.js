export function getSchedule(start, end) {
  return `{
    schedule(start: "${start}", end: "${end}") {
    id,
    abbreviation,
    avgScheduleScore,
    scheduleScore,
    name,
    games {
      gamePk,
      date,
      home { 
        team { 
          id, 
          name 
        },
        leagueRecord {
          wins,
          losses,
          ot
        }
      }, 
      away {
        team { 
          id, 
          name 
        },
        leagueRecord {
          wins,
          losses,
          ot
        }
      }, 
      opponent { 
        rating,
        team { 
          id, 
          name 
        },
        leagueRecord {
          wins,
          losses,
          ot
        }
      }
    }
  }
  }`
};

export function getTeamSchedule(id, start, end) {
  return `{
    scheduleByTeam(id: ${id}, start: "${start}", end: "${end}") {
      gamePk,
      date,
      home { 
        team { 
          id, 
          name 
        },
        leagueRecord {
          wins,
          losses,
          ot
        }
      }, 
      away {
        team { 
          id, 
          name 
        },
        leagueRecord {
          wins,
          losses,
          ot
        }
      }, 
      opponent { 
        rating,
        team { 
          id, 
          name 
        },
        leagueRecord {
          wins,
          losses,
          ot
        }
      }
    }
  }`
};

export function getStandings(season) {
  return `
  {
    standings(season: "${season}") { 
      division {
        id,
        name
      }
      teamRecords { 
        divisionRank, 
        team { 
          id, 
          name 
        },
        leagueRecord {
          wins,
          losses,
          ot
        },
        gamesPlayed,
        goalsScored,
        goalsAgainst,
        points
      } 
    }
  }`
}

export function getGamesBetweenTeams(homeId, awayId) {
  return `{
    gamesBetweenTeams(homeId: ${homeId}, awayId: ${awayId}){ 
        gamePk,
        gameDate,
        home {
          score,
          team { id, name }
        },
        away { 
          score,
          team { id, name }
        }
      }
  }`
}

export function getGame(id) {
  return `{
    game(gameId: ${id}){ 
        id,
        gameDate,
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
  }`
}

export function getTodaysGames() {
  return `{
    todaysGames  {
      gamePk,
      gameTime,
      currentPeriod,
      currentPeriodOrdinal,
      currentPeriodTimeRemaining,
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
  }`
}