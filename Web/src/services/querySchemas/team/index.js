import { loader } from "graphql.macro";

export const getTeams = /* GraphQL */ `
  query teams {
    teams {
      id
      name
    }
  }
`;

export const getTeamLocations = /* GraphQL */ `
  query teamLocations {
    teamLocations {
      teamLocations {
        id
        text
        center
        color
      }
      seasonDescription
      divisions {
        key
        value
      }
    }
  }
`;

export const getTeam = loader("./getTeam.gql");
