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

export const getTeam = /* GraphQL */ `
  query team($id: Int) {
    team(id: $id) {
      id
      name
      description
      abbreviation
      venue {
        name
        city
        description
      }
      goalies {
        ...PlayerDataFragment
      }
      defenders {
        ...PlayerDataFragment
      }
      forwards {
        ...PlayerDataFragment
      }
    }
  }

  fragment PlayerDataFragment on Player {
    id
    fullName
    currentAge
    jerseyNumber
    active
    alternateCaptain
    birthCity
    birthDate
    captain
    firstName
    lastName
    height
    primaryNumber
    primaryPosition {
      code
      name
    }
    rookie
    rosterStatus
    shootsCatches
    weight
    nationality
    capHit
  }
`;
