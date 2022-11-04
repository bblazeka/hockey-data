import { isNil } from "lodash";
import { DateTime } from "luxon";

import { Database } from "adapters/dbhandler";
import { nhlApiRequest } from "adapters/apihandler";
import { getActiveTeams } from "./teamResolvers";
import { EDatabaseCollection } from "utils/enums";

let db = new Database();

function init(database: Database) {
  db = database;
}

type TGamesBetweenTeamsParams = {
  teamId: number;
  opponentId: number;
  season: string;
};

async function gamesBetweenTeams({
  teamId,
  opponentId,
  season,
}: TGamesBetweenTeamsParams) {
  const games = await db
    .getCollection(EDatabaseCollection.games)
    .find({
      $and: [
        {
          $or: [
            {
              "home.team.id": teamId,
              "away.team.id": opponentId,
              gameType: "R",
            },
            {
              "home.team.id": opponentId,
              "away.team.id": teamId,
              gameType: "R",
            },
          ],
        },
        {
          ...(season ? { season: season } : {}),
        },
      ],
    })
    .sort({
      gameDate: 1
    })
    .toArray();
  const activeTeams = await getActiveTeams();
  const team = activeTeams.find((team) => team.id === teamId);
  const opponent = activeTeams.find((team) => team.id === opponentId);

  let teamGoals = 0;
  let opponentGoals = 0;

  const goalScoringOptions = [
    { name: "0-3 goals", threshold: 4, value: 0 },
    { name: "4-7 goals", threshold: 8, value: 0 },
    { name: "8+ goals", value: 0 },
  ];

  const determineGameScoringLevel = (homeGoals: number, awayGoals: number) => {
    const gameGoalsTotal = homeGoals + awayGoals;
    for (let option of goalScoringOptions) {
      if (!option.threshold || option.threshold > gameGoalsTotal) {
        option.value++;
        break;
      }
    }
  };

  const gameScores = games.map((g, i) => {
    teamGoals += g.home.team.id === teamId ? g.home.score : g.away.score;
    opponentGoals +=
      g.home.team.id === opponentId ? g.home.score : g.away.score;
    const finished = g.status.statusCode === "7";
    if (finished) {
      determineGameScoringLevel(g.home.score, g.away.score);
    }
    return {
      name: `Game ${i + 1}`,
      homeGoals: g.home.score,
      awayGoals: g.away.score,
      winnerId: !finished
        ? undefined
        : g.home.score > g.away.score
        ? g.home.team.id
        : g.away.team.id,
      homeWin: g.home.score > g.away.score,
      finished,
    };
  });
  const teamWins = gameScores.filter((g) => g.winnerId === teamId).length;
  const opponentWins = gameScores.filter(
    (g) => g.winnerId === opponentId
  ).length;
  const homeWins = gameScores.filter((g) => g.homeWin && g.finished).length;
  const awayWins = gameScores.filter((g) => !g.homeWin && g.finished).length;

  return {
    team,
    opponent,
    score: {
      homeWins,
      awayWins,
      teamWins,
      opponentWins,
      teamGoals,
      opponentGoals,
      gameGoals: goalScoringOptions,
    },
    games,
  };
}

type TGetDailyGamesParams = {
  dateISO: string;
};

async function getDailyGames({ dateISO }: TGetDailyGamesParams) {
  const games = await db
    .getCollection(EDatabaseCollection.games)
    .find({
      date: dateISO ?? DateTime.now().toISODate(),
    })
    .sort({
      gameDate: 1
    })
    .toArray();
  return games.map(async (game) => {
    const result = await nhlApiRequest(`/api/v1/game/${game.gamePk}/linescore`);
    const isOngoingGame =
      !isNil(result.currentPeriodTimeRemaining) &&
      DateTime.fromJSDate(game.gameDate) < DateTime.now();
    const isFinished =
      isOngoingGame && result.currentPeriodTimeRemaining === "Final";
    return {
      ...result,
      gameTime: DateTime.fromJSDate(game.gameDate).toFormat("HH:mm"),
      gamePk: game.gamePk,
      ongoingGame: isOngoingGame,
      finished: isFinished,
    };
  });
}

export { init, getDailyGames, gamesBetweenTeams };
