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
      id,
      text,
      center,
      color
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
      venue { name, city, description },
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