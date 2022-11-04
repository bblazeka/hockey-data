import { loader } from "graphql.macro";

export const getScheduleQuery = /* GraphQL */`
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

export const getTeamScheduleQuery = loader("./getTeamScheduleQuery.gql");

export const getDivisionsWithTeams = loader("./getDivisionsWithTeams.gql");