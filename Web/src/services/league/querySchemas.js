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
  }`;
}

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
  }`;
}

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
  }`;
}