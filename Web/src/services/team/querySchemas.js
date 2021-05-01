export function getTeams() {
  return `{
    teams { 
      id, 
      name 
    }
  }`;
}

export function getTeamLocations() {
  return `{
    teamLocations {
      id,
      text,
      center,
      color
    }
  }`;
}

export function getTeam(id) {
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
          currentAge,
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
          capHit,
    },
    defenders {
          id,
          fullName,
          currentAge,
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
          capHit,
    } ,
    forwards {
          id,
          fullName,
          currentAge,
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
          capHit,
    },
    rosterStats {
      id,
      fullName,
      stats {
        games,
        goals,
        assists,
        points,
        plusMinus,
        timeOnIce,
        shots,
        hits,
        blocked,
        powerPlayGoals,
        powerPlayPoints
      }
    }
  }
}`;
}