export function getSchedule(start, end) {
  return `{
    schedule(start: "${start}", end: "${end}") {
    id,
    abbreviation,
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

export function getStandings(season) {
  return`
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

export function getGamesBetweenTeams(homeId,awayId) {
  return`{
    gamesBetweenTeams(homeId: ${homeId}, awayId: ${awayId}){ 
        gamePk,
        gameDate
      }
  }`
}

export function getGame(id) {
  return`{
    game(gameId: ${id}){ 
        id,
        gameDate,
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