export function getBasicPlayer(id) {
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

export function getBasicPlayerByName(name) {
  return `{
    searchPlayerByName(name: "${name}"){ 
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

export function getSkater(id) {
  return `{
    player(id: ${id}) { 
      id,
      jerseyNumber,
      fullName,
      description,
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

export function getGoalie(id) {
  return `{
    player(id: ${id}) { 
      id,
      jerseyNumber,
      fullName, 
      nationality,
      description,
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

export function getSelectedPlayers() {
  return `
  {
    selectedPlayers {
      skaters { 
        player { id, fullName }
        stats {
          splits {
            stat {
              games,
              goals,
              assists,
              points,
              pim,
              plusMinus,
              faceOffPct,
              shots,
              hits,
              blocked,
              timeOnIce,
              evenTimeOnIce,
              powerPlayTimeOnIce,
              shortHandedTimeOnIce,
              shotPct,
              gameWinningGoals,
              powerPlayGoals,
              powerPlayPoints,
              shortHandedGoals,
              shortHandedPoints
            }
          }
        }
      }
      goalies { 
        player { id, fullName } 
         stats {
          splits {
            stat {
              games,
              gamesStarted,
              goalAgainstAverage,
              savePercentage,
              wins,
              losses,
              ot,
              saves,
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
      }
    }
  }`;
}

export function deleteSelectedPlayer(id) {
  return `
    mutation {
      deleteSelectedPlayer(id: ${id}) {
        skaters { 
          player { id, fullName }
          stats {
            splits {
              stat {
                games,
                goals,
                assists,
                points,
                pim,
                plusMinus,
                faceOffPct,
                shots,
                hits,
                blocked,
                timeOnIce,
                evenTimeOnIce,
                powerPlayTimeOnIce,
                shortHandedTimeOnIce,
                shotPct,
                gameWinningGoals,
                powerPlayGoals,
                powerPlayPoints,
                shortHandedGoals,
                shortHandedPoints
              }
            }
          }
        }
        goalies { 
          player { id, fullName } 
           stats {
            splits {
              stat {
                games,
                gamesStarted,
                goalAgainstAverage,
                savePercentage,
                wins,
                losses,
                ot,
                saves,
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
        }
      }
    }`;
}

export function addSelectedPlayer(id) {
  return `
      mutation {
        addSelectedPlayer(id: ${id}) {
          skaters { 
            player { id, fullName }
            stats {
              splits {
                stat {
                  games,
                  goals,
                  assists,
                  points,
                  pim,
                  plusMinus,
                  faceOffPct,
                  shots,
                  hits,
                  blocked,
                  timeOnIce,
                  evenTimeOnIce,
                  powerPlayTimeOnIce,
                  shortHandedTimeOnIce,
                  shotPct,
                  gameWinningGoals,
                  powerPlayGoals,
                  powerPlayPoints,
                  shortHandedGoals,
                  shortHandedPoints
                }
              }
            }
          }
          goalies { 
            player { id, fullName } 
             stats {
              splits {
                stat {
                  games,
                  gamesStarted,
                  goalAgainstAverage,
                  savePercentage,
                  wins,
                  losses,
                  ot,
                  saves,
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
          }
        }
      }`;
}