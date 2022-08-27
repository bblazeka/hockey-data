import { loader } from 'graphql.macro';

export const getGamesBetweenTeams = /* GraphQL */ `
  query gamesBetweenTeams($teamId: Int, $opponentId: Int, $season: String) {
    gamesBetweenTeams(
      teamId: $teamId
      opponentId: $opponentId
      season: $season
    ) {
      team {
        id
        abbreviation
        name
        colorScheme
      }
      opponent {
        id
        abbreviation
        name
        colorScheme
      }
      score {
        homeWins
        awayWins
        teamWins
        opponentWins
        teamGoals
        opponentGoals
        gameGoals {
          name
          value
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

export const getGame = loader('./getGame.gql');

export const getDailyGames = loader('./getDailyGames.gql');
