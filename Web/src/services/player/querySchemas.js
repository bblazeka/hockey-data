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
  }`;
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
  }`;
}

export function getSkater(id) {
  return `{
    player(id: ${id}) { 
      id,
      jerseyNumber,
      fullName,
      currentAge,
      description,
      nationality,
      birthCity,
      birthDate,
      capHit,
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
        stats {
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
            penaltyMinutes,
            plusMinus,
          }
        }
      },
      nhlStats {
        totalGames,
        totalGoals,
        totalAssists,
        totalPoints,
        seasonSums { season, goals, assists },
        stats { 
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
            penaltyMinutes,
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
    }
  }`;
}

export function getGoalie(id) {
  return `{
    player(id: ${id}) { 
      id,
      jerseyNumber,
      fullName, 
      currentAge,
      nationality,
      description,
      birthCity,
      birthDate,
      capHit,
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
        stats {
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
        }
      },
      nhlStats {
        totalGames,
        totalGamesStarted,
        totalWins,
        seasonSums { season, games, wins },
        stats {
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
    }
  }`;
}

export function getSelectedPlayers(playerIds, seasonId) {
  return `
  {
    selectedPlayers(playerIds: "${playerIds.join(
      ","
    )}", seasonId: ${seasonId}) {
      ${getSelectedSkaterQuery()}
      ${getSelectedGoalieQuery()}
    }
  }`;
}

export function deleteSelectedPlayer(id, seasonId) {
  return `
    mutation {
      deleteSelectedPlayer(id: ${id}, seasonId: ${seasonId}) {
        ${getSelectedSkaterQuery()}
        ${getSelectedGoalieQuery()}
      }
    }`;
}

export function removeAllPlayers(seasonId) {
  return `
    mutation {
      clearSelectedPlayers(seasonId: ${seasonId}) {
        ${getSelectedSkaterQuery()}
        ${getSelectedGoalieQuery()}
      }
    }`;
}

export function addSelectedPlayer(id, seasonId) {
  return `
      mutation {
        addSelectedPlayer(id: ${id}, seasonId: ${seasonId}) {
          ${getSelectedSkaterQuery()}
          ${getSelectedGoalieQuery()}
        }
      }`;
}

function getSelectedSkaterQuery() {
  return `
  skaters { 
      id,
      fullName,
      currentTeam { id },
      primaryPosition { abbreviation }
      stats {
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
        evenTimeOnIceMinutes,
        powerPlayTimeOnIce,
        powerPlayTimeOnIceMinutes,
        shortHandedTimeOnIce,
        shortHandedTimeOnIceMinutes,
        shotPct,
        gameWinningGoals,
        powerPlayGoals,
        powerPlayPoints,
        shortHandedGoals,
        shortHandedPoints
  }
      averageStats {
        goals,
        assists,
        points,
        shots,
        hits,
        blocked,
        powerPlayGoals,
        powerPlayPoints,
        shortHandedGoals,
        shortHandedPoints,
        gameWinningGoals
      }
  }`;
}

function getSelectedGoalieQuery() {
  return `
    goalies {  
        id, 
        fullName,
        currentTeam { id },
        primaryPosition { abbreviation }
        stats {
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
      averageStats {
        saves
      }
    }`;
}
