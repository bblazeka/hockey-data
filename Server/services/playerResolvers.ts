import { round } from "lodash";
import { nhlApiRequest, playerWikiRequest } from "adapters/apihandler";

import { Database } from "adapters/dbhandler";
import { EDatabaseCollection } from "utils/enums";

let db = new Database();

function init(database: Database) {
  db = database;
}

function getGroup(array) {
  const sumObjectsByKey = (...objs) => {
    const res = objs.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
    return res;
  };

  const result = [];
  array.reduce(function (res, value) {
    const key = `${value.season.substr(2, 2)}/${value.season.slice(-2)}`;
    if (!res[key]) {
      res[key] = Object.assign(value.stat, { season: key });
      result.push(res[key]);
    }
    res[key] = sumObjectsByKey(res[key], value);
    return res;
  }, {});
  return result;
}

async function getPlayer({ id }) {
  const query = { id };
  const player = await db
    .getCollection(EDatabaseCollection.players)
    .findOne(query);

  const result = await nhlApiRequest(
    `/api/v1/people/${id}/stats?stats=yearByYear`
  );
  const nhlStatsOnly = result.stats[0].splits.filter(
    (el) => el.league.id === 133
  );
  player.nhlStats = {
    totalGames: nhlStatsOnly.reduce(
      (accum, item) => accum + item.stat.games,
      0
    ),
    totalGamesStarted: nhlStatsOnly.reduce(
      (accum, item) => accum + item.stat.gamesStarted,
      0
    ),
    totalWins: nhlStatsOnly.reduce((accum, item) => accum + item.stat.wins, 0),
    totalGoals: nhlStatsOnly.reduce(
      (accum, item) => accum + item.stat.goals,
      0
    ),
    totalAssists: nhlStatsOnly.reduce(
      (accum, item) => accum + item.stat.assists,
      0
    ),
    totalPoints: nhlStatsOnly.reduce(
      (accum, item) => accum + item.stat.points,
      0
    ),
    seasonSums: getGroup(nhlStatsOnly),
    stats: nhlStatsOnly,
  };
  player.careerStats = { stats: result.stats[0].splits };
  player.description = (
    await playerWikiRequest(
      player.fullName,
      `(ice hockey, born ${player.birthDate.split("-")[0]})`
    )
  ).extract;
  return player;
}

async function getPlayerByName({ name }) {
  const query = { fullName: new RegExp(name, "i") };
  const players = await db
    .getCollection(EDatabaseCollection.players)
    .find(query)
    .toArray();
  return players;
}

async function getPlayersFromTeam(teamId) {
  const items = await db
    .getCollection(EDatabaseCollection.players)
    .find({ "currentTeam.id": parseInt(teamId) })
    .toArray();

  return items;
}

async function getPlayers() {
  const items = await db
    .getCollection(EDatabaseCollection.players)
    .find({})
    .toArray();

  return items;
}

async function getSelectedPlayers({ playerIds, seasonId, projectedStats }) {
  const statsType = projectedStats
    ? "onPaceRegularSeason"
    : "statsSingleSeason";

  const selectedPlayerIds = playerIds.split(",");
  const skaters = [];
  const goalies = [];
  for (let playerId of selectedPlayerIds) {
    const playerStats = (
      await nhlApiRequest(
        `/api/v1/people/${playerId}/stats?stats=${statsType}&season=${seasonId}`
      )
    ).stats[0].splits[0].stat;
    const query = { id: parseInt(playerId) };
    const player = await db
      .getCollection(EDatabaseCollection.players)
      .findOne(query);

    if (player.primaryPosition.code !== "G") {
      player.stats = Object.assign(playerStats, {
        evenTimeOnIceMinutes: parseInt(playerStats.evenTimeOnIce.split(":")[0]),
        powerPlayTimeOnIceMinutes: parseInt(
          playerStats.powerPlayTimeOnIce.split(":")[0]
        ),
        shortHandedTimeOnIceMinutes: parseInt(
          playerStats.shortHandedTimeOnIce.split(":")[0]
        ),
      });
      player.averageStats = {
        goals: round(playerStats.goals / playerStats.games, 2),
        assists: round(playerStats.assists / playerStats.games, 2),
        points: round(playerStats.points / playerStats.games, 2),
        shots: round(playerStats.shots / playerStats.games, 2),
        hits: round(playerStats.hits / playerStats.games, 2),
        blocked: round(playerStats.blocked / playerStats.games, 2),
        powerPlayGoals: round(
          playerStats.powerPlayGoals / playerStats.games,
          2
        ),
        powerPlayPoints: round(
          playerStats.powerPlayPoints / playerStats.games,
          2
        ),
        shortHandedGoals: round(
          playerStats.shortHandedGoals / playerStats.games,
          2
        ),
        shortHandedPoints: round(
          playerStats.shortHandedPoints / playerStats.games,
          2
        ),
        gameWinningGoals: round(
          playerStats.gameWinningGoals / playerStats.games,
          2
        ),
      };
      skaters.push(player);
    } else {
      player.stats = playerStats;
      goalies.push(player);
    }
  }
  return {
    skaters: skaters,
    goalies: goalies,
  };
}

export {
  init,
  getPlayer,
  getPlayers,
  getPlayersFromTeam,
  getPlayerByName,
  getSelectedPlayers,
};
