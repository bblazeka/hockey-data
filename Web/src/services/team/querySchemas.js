export const getTeams = /* GraphQL */ `
  query teams {
    teams { 
      id, 
      name 
    }
  }`;

export const getTeamLocations = /* GraphQL */ `
  query teamLocations {
    teamLocations {
      teamLocations { id, text, center, color },
      seasonDescription,
      divisions { key, value }
    }
  }`;

export const getTeam = /* GraphQL */ `
  query team($id: Int) {
    team(id: $id) {
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
        skaterStats {
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
            powerPlayPoints,
            powerPlayTimeOnIce,
            evenTimeOnIce,
            penaltyMinutes,
            faceOffPct,
            shotPct,
            gameWinningGoals,
            overTimeGoals,
            shortHandedGoals,
            shortHandedTimeOnIce,
            shifts,
            timeOnIcePerGame,
            shortHandedTimeOnIcePerGame,
            powerPlayTimeOnIcePerGame
          }
        },
        goalieStats {
          id,
          fullName,
          stats {
            timeOnIce,
            ot,
            shutouts,
            wins,
            losses,
            saves,
            powerPlaySaves,
            shortHandedSaves,
            evenSaves,
            shortHandedShots,
          evenShots,
          powerPlayShots,
          savePercentage,
          goalAgainstAverage,
          games,
          gamesStarted,
          shotsAgainst,
          goalsAgainst,
          powerPlaySavePercentage,
          shortHandedSavePercentage,
          evenStrengthSavePercentage
          }
        }
      }
    }`;