export function getBasicPlayer(id)
{
  return `{
    player(id: ${id}){ 
        id,
        fullName, 
        primaryPosition {
          code,
          name,
          type,
        }
        currentTeam {
          id,
          name
        }
      }
  }`
}

export function getSkater(id)
{
  return `{
    player(id: ${id}) { 
      id,
      jerseyNumber,
      fullName, 
      nationality,
      birthCity,
      birthDate,
      primaryPosition {
        code,
        name,
        type,
      }
      currentTeam {
        id,
        name
      },
      careerStats { 
        season,
        team {
          id,
          name
        },
        league {
          id,
          name
        }
        stat {
          games,
          goals,
          assists,
          points,
          pim,
          plusMinus,
        }
      },
      nhlStats { 
        season,
        team {
          id,
          name
        },
        stat {
          games,
          goals,
          assists,
          points,
          pim,
          plusMinus,
          timeOnIce,
          faceOffPct,
          shots,
          hits,
          blocked,
          evenTimeOnIce,
          powerPlayTimeOnIce,
          shortHandedTimeOnIce,
          shotPct,
          gameWinningGoals,
          powerPlayGoals,
          powerPlayPoints,
          shortHandedGoals,
          shortHandedPoints,
        }
      }
    }
  }`
};

export function getGoalie(id)
{
  return `{
    player(id: ${id}) { 
      id,
      jerseyNumber,
      fullName, 
      nationality,
      birthCity,
      birthDate,
      primaryPosition {
        code,
        name,
        type,
      }
      currentTeam {
        id,
        name
      },
      careerStats { 
        season,
        team {
          id,
          name
        },
        league {
          id,
          name
        }
        stat {
          games,
          goalAgainstAverage,
          savePercentage,
          wins,
          losses,
          ot
        }
      },
      nhlStats { 
        season,
        team {
          id,
          name
        },
        stat {
          games,
          gamesStarted,
          goalAgainstAverage,
          savePercentage,
          wins,
          losses,
          ot,
          evenSaves,  
          powerPlaySaves,
          shortHandedSaves,
          shotsAgainst,
          evenShots,
          powerPlayShots,
          shortHandedShots,
          evenStrengthSavePercentage,
          powerPlaySavePercentage,
          shortHandedSavePercentage,
          shutouts,
          timeOnIce
        }
      }
    }
  }`
};