export function getTeams()
{
  return `{
    teams { 
      id, 
      name 
    }
  }`
};

export function getTeam(id)
{
  return `{
    team(id: ${id}) { 
      id, 
      name, 
      abbreviation, 
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