export function getTeams()
{
  return `{
    teams { 
      id, 
      name 
    }
  }`
};

export function getTeamLocations()
{
  return `{
    teamLocations {
      center
    }
  }`
};

export function getTeam(id)
{
  return `{
    team(id: ${id}) { 
      id, 
      name,
      description,
      abbreviation,
      venue { name, city },
      goalies {
          id,
          fullName,
          jerseyNumber,
          active,
          alternateCaptain,
          birthCity,
          birthDate,
          captain,
          firstName,
          lastName,
          height,
          primaryNumber,
          primaryPosition {
            code,
            name
          },
          rookie,
          rosterStatus,
          shootsCatches,
          weight,
          nationality,
    },
    defenders {
          id,
          fullName,
          jerseyNumber,
          active,
          alternateCaptain,
          birthCity,
          birthDate,
          captain,
          firstName,
          lastName,
          height,
          primaryNumber,
          primaryPosition {
            code,
            name
          },
          rookie,
          rosterStatus,
          shootsCatches,
          weight,
          nationality,
  } ,
    forwards {
          id,
          fullName,
          jerseyNumber,
          active,
          alternateCaptain,
          birthCity,
          birthDate,
          captain,
          firstName,
          lastName,
          height,
          primaryNumber,
          primaryPosition {
            code,
            name
          },
          rookie,
          rosterStatus,
          shootsCatches,
          weight,
          nationality,
        }
  }
  }`
};