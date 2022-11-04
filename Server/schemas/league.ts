import { gql } from "apollo-server-lambda";

export const leagueSchema = gql`
  type ScheduleTeam {
    id: Int
    name: String
    abbreviation: String
    active: Boolean
    avgScheduleScore: Float
    scheduleScore: Float
    games: [Game]
  }

  type Opponent {
    score: Int
    rating: Float
    team: Team
    leagueRecord: LeagueRecord
  }

  type LeagueRecord {
    wins: Int
    losses: Int
    ot: Int
    type: String
  }

  type Division {
    id: Int
    name: String
    teams: [Team]
  }

  type TeamRecord {
    divisionRank: Int
    team: Team
    leagueRecord: LeagueRecord
    gamesPlayed: Int
    goalsScored: Int
    goalsAgainst: Int
    points: Int
  }

  type Linescore {
    currentPeriodOrdinal: String
    currentPeriodTimeRemaining: String
    teams: LinescoreTeams
    periods: [Period]
  }

  type LinescoreTeams {
    home: TeamGameStats
    away: TeamGameStats
  }

  type Period {
    num: Int
    home: TeamGameStats
    away: TeamGameStats
  }

  type TeamGameStats {
    goals: Int
    shotsOnGoal: Int
    rinkSide: String
    team: Team
  }

  type GameOfficial {
    official: Official
    officialType: String
  }

  type Official {
    id: Int
    fullName: String
  }

  type Coach {
    person: Person
    position: StaffPosition
  }

  type StaffPosition {
    code: String
    name: String
    type: String
    abbreviation: String
  }

  type Person {
    fullName: String
  }
`;
