import { sortBy, isNil, toInteger } from "lodash";
import { DateTime } from "luxon";

import { Database, TDbTeam } from "../adapters/dbhandler";
import { nhlApiRequest } from "../adapters/apihandler";
import { mapGoalie, mapSkater } from "./gameFunctions";
import { getActiveTeams } from "./teamResolvers";

let db = new Database();

function init(database) {
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
  const dbGames = await db
    .getCollection("games")
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
    .toArray();
  const activeTeams = await getActiveTeams();
  const team = activeTeams.find((team) => team.id === teamId);
  const opponent = activeTeams.find((team) => team.id === opponentId);
  const games = sortBy(dbGames, function (game) {
    return new Date(game.gameDate);
  });

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

type TGetGameParams = {
  gameId: string;
};

async function getGame({ gameId }: TGetGameParams) {
  const linescore = await nhlApiRequest(`/api/v1/game/${gameId}/linescore`);
  const result = await nhlApiRequest(`/api/v1/game/${gameId}/boxscore`);
  const dbGame = (
    await db.getCollection("games").find({ gamePk: gameId }).toArray()
  )[0];
  result.gameDate = dbGame.gameDate;
  result.gameType = dbGame.gameType;
  result.season = dbGame.season;
  result.id = gameId;
  result.linescore = linescore;
  result.venue = dbGame.venue;

  if (!isNil(result.linescore.currentPeriodTimeRemaining)) {
    const res = result.linescore.currentPeriodTimeRemaining.split(":");
    const time = (1200 - (toInteger(res[0]) * 60 + toInteger(res[1]))) / 1200;
    result.percentage =
      ((result.linescore.currentPeriod - 1) * 0.34 + time * 0.34) * 100;
  }
  result.teams.home.skaters = Object.values(result.teams.home.players)
    .filter((player: TApiGamePlayer) => {
      return (
        result.teams.home.skaters.includes(player.person.id) &&
        !result.teams.home.scratches.includes(player.person.id)
      );
    })
    .map(mapSkater);
  result.teams.home.goalies = Object.values(result.teams.home.players)
    .filter((player: TApiGamePlayer) => {
      return (
        result.teams.home.goalies.includes(player.person.id) &&
        !result.teams.home.scratches.includes(player.person.id)
      );
    })
    .map(mapGoalie);
  result.teams.away.skaters = Object.values(result.teams.away.players)
    .filter((player: TApiGamePlayer) => {
      return (
        result.teams.away.skaters.includes(player.person.id) &&
        !result.teams.away.scratches.includes(player.person.id)
      );
    })
    .map(mapSkater);
  result.teams.away.goalies = Object.values(result.teams.away.players)
    .filter((player: TApiGamePlayer) => {
      return (
        result.teams.away.goalies.includes(player.person.id) &&
        !result.teams.away.scratches.includes(player.person.id)
      );
    })
    .map(mapGoalie);
  return result;
}

type TGetDailyGamesParams = {
  dateISO: string;
};

async function getDailyGames({ dateISO }: TGetDailyGamesParams) {
  const games = await db
    .getCollection("games")
    .find({
      date: dateISO ?? DateTime.now().toISODate(),
    })
    .toArray();
  sortBy(games, function (game) {
    return new Date(game.gameDate);
  });
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

export { init, getGame, getDailyGames, gamesBetweenTeams };
