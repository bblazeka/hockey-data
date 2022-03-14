import gql from "graphql-tag";

export const getGamesBetweenTeams = /* GraphQL */ `
  query gamesBetweenTeams($homeId: Int, $awayId: Int, $season: String) {
    gamesBetweenTeams(homeId: $homeId, awayId: $awayId, season: $season) {
      score {
        homeWins
        awayWins
        gameScores {
          name
          homeGoals
          awayGoals
        }
      }
      games {
        gamePk
        gameDate
        gameType
        season
        status {
          abstractGameState
          detailedState
          statusCode
        }
        home {
          score
          leagueRecord {
            wins
            losses
            ot
          }
          team {
            id
            name
          }
        }
        away {
          score
          leagueRecord {
            wins
            losses
            ot
          }
          team {
            id
            name
          }
        }
      }
    }
  }
`;

export const getGame = /* GraphQL */ `
  query game($gameId: Int) {
    game(gameId: $gameId) {
      id
      gameDate
      gameType
      percentage
      venue {
        id
        name
      }
      season
      teams {
        home {
          skaters {
            jerseyNumber
            person {
              id
              fullName
            }
            position {
              code
              name
            }
            stats {
              timeOnIce
              assists
              goals
              shots
              hits
              blocked
              plusMinus
              penaltyMinutes
              faceOffWins
              faceoffTaken
              faceOffPct
              powerPlayGoals
              powerPlayAssists
              shortHandedGoals
              shortHandedAssists
              shortHandedTimeOnIce
              powerPlayTimeOnIce
            }
          }
          goalies {
            jerseyNumber
            person {
              id
              fullName
            }
            position {
              code
              name
            }
            stats {
              timeOnIce
              shots
              saves
              savePercentage
              powerPlaySaves
              shortHandedSaves
              evenSaves
              shortHandedShotsAgainst
              evenShotsAgainst
              savePercentage
              powerPlaySavePercentage
              shortHandedSavePercentage
              evenStrengthSavePercentage
            }
          }
          team {
            id
            name
          }
          coaches {
            person {
              fullName
            }
            position {
              code
              name
              type
            }
          }
        }
        away {
          skaters {
            jerseyNumber
            person {
              id
              fullName
            }
            position {
              code
              name
            }
            stats {
              timeOnIce
              assists
              goals
              shots
              hits
              blocked
              plusMinus
              penaltyMinutes
              faceOffWins
              faceoffTaken
              faceOffPct
              powerPlayGoals
              powerPlayAssists
              shortHandedGoals
              shortHandedAssists
              shortHandedTimeOnIce
              powerPlayTimeOnIce
            }
          }
          goalies {
            jerseyNumber
            person {
              id
              fullName
            }
            position {
              code
              name
            }
            stats {
              timeOnIce
              shots
              saves
              savePercentage
              powerPlaySaves
              shortHandedSaves
              evenSaves
              shortHandedShotsAgainst
              evenShotsAgainst
              savePercentage
              powerPlaySavePercentage
              shortHandedSavePercentage
              evenStrengthSavePercentage
            }
          }
          team {
            id
            name
          }
          coaches {
            person {
              fullName
            }
            position {
              code
              name
              type
            }
          }
        }
      }
      officials {
        official {
          id
          fullName
        }
        officialType
      }
      linescore {
        currentPeriodOrdinal
        currentPeriodTimeRemaining
        teams {
          home {
            goals
            shotsOnGoal
          }
          away {
            goals
            shotsOnGoal
          }
        }
        periods {
          num
          home {
            goals
            shotsOnGoal
          }
          away {
            goals
            shotsOnGoal
          }
        }
      }
    }
  }
`;

export const dailyGames = gql`
  query dailyGames($dateISO: String) {
    dailyGames(dateISO: $dateISO) {
      gamePk
      gameTime
      currentPeriod
      currentPeriodOrdinal
      currentPeriodTimeRemaining
      ongoingGame
      finished
      teams {
        home {
          team {
            id
            name
          }
          goals
          shotsOnGoal
        }
        away {
          team {
            id
            name
          }
          goals
          shotsOnGoal
        }
      }
    }
  }
`;
