import { gql } from "apollo-server-lambda";

export const teamSchema = gql`
  type Team {
    id: Int
    abbreviation: String
    name: String
    description: String
    active: Boolean
    venue: Venue
    colorScheme: String
    rosterResponse: [Player]
    goalies: [Player]
    defenders: [Player]
    forwards: [Player]
  }

  type Lines {
    goalies: Goalies
    lines: [Line]
    ppLines: [Line]
  }

  type Goalies {
    starter: String
    backup: String
  }

  type Line {
    leftDefender: String
    rightDefender: String
    leftWing: String
    center: String
    rightWing: String
  }
`;