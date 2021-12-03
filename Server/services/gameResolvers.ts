import { sortBy, isNil, toInteger } from "lodash";
import { DateTime } from "luxon";

import { Database } from "../adapters/dbhandler";
import { nhlApiRequest } from "../adapters/apihandler";
import { mapGoalie, mapSkater } from "./gameFunctions";

let db = new Database();

function init(database) {
  db = database;
}

async function gamesBetweenTeams({ homeId, awayId }) {
  const dbGames = await db
    .getCollection("games")
    .find({
      "home.team.id": homeId,
      "away.team.id": awayId,
      gameType: "R",
    })
    .toArray();
  const games = sortBy(dbGames, function (game) {
    return new Date(game.gameDate);
  });
  const gameScores = games.map((g, i) => {
    return {
      name: `Game ${i + 1}`,
      homeGoals: g.home.score,
      awayGoals: g.away.score,
    };
  });
  const homeWins = games.filter((d) => d.home.score > d.away.score).length;
  const awayWins = games.length - homeWins;

  return {
    score: {
      homeWins,
      awayWins,
      gameScores,
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

async function getTodaysGames() {
  const games = await db
    .getCollection("games")
    .find({
      date: DateTime.now().toISODate(),
    })
    .toArray();
  sortBy(games, function (game) {
    return new Date(game.gameDate);
  });
  return games.map(async (game) => {
    const result = await nhlApiRequest(`/api/v1/game/${game.gamePk}/linescore`);
    result.gameTime = DateTime.fromJSDate(game.gameDate).toFormat("HH:mm");
    result.gamePk = game.gamePk;
    result.ongoingGame =
      !isNil(result.currentPeriodTimeRemaining) &&
      DateTime.fromJSDate(game.gameDate) < DateTime.now();
    result.finished =
      result.ongoingGame && result.currentPeriodTimeRemaining === "Final";
    return result;
  });
}

export { init, getGame, getTodaysGames, gamesBetweenTeams };
