export const getSchedule = /* GraphQL */`
  query game($start: String, $end: String){
    schedule(start: $start, end: $end) {
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

export const getTeamSchedule = /* GraphQL */`
  query scheduleByTeam($id: Int, $start: String, $end: String){
    scheduleByTeam(id: $id, start: $start, end: $end) {
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

export const getStandings = /* GraphQL */`
query standings($season: String)
  {
    standings(season: $season) { 
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

export const getDivisionsWithTeams = /* GraphQL */`
query divisionsWithTeams
{
    divisionsWithTeams { 
      id, 
      name,
      teams { id, abbreviation, name }
    }
}`;