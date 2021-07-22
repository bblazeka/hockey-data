var _ = require('lodash');
const { DateTime } = require('luxon');

const { Database } = require('../../comm/dbhandler');
const apicomm = require('../../comm/apihandler');

var db = new Database();

function init(database) {
  db = database;
}

async function gamesBetweenTeams({ homeId, awayId }) {
  const dbGames = await db.getCollection('games').find({
    'home.team.id': homeId,
    'away.team.id': awayId,
    'gameType': 'R'
  }).toArray();
  const games = _.sortBy(dbGames, function (game) {
    return new Date(game.gameDate);
  })
  const gameScores = games.map((g, i) => {
    return {
      'name': `Game ${i + 1}`,
      'homeGoals': g.home.score,
      'awayGoals': g.away.score
    }
  });
  const homeWins = games.filter(d => d.home.score > d.away.score).length;
  const awayWins = games.length - homeWins;

  return {
    score: {
      homeWins,
      awayWins,
      gameScores
    },
    games
  }
}

async function getGame({ gameId }) {
  const linescore = await apicomm.nhlApiRequest(`/api/v1/game/${gameId}/linescore`);
  var result = await apicomm.nhlApiRequest(`/api/v1/game/${gameId}/boxscore`);
  var dbGame = (await db.getCollection('games').find({ 'gamePk': gameId }).toArray())[0];
  result.gameDate = dbGame.gameDate;
  result.gameType = dbGame.gameType;
  result.season = dbGame.season;
  result.id = gameId;
  result.linescore = linescore;
  result.venue = dbGame.venue;

  if (!_.isNil(result.linescore.currentPeriodTimeRemaining)) {
    var res = result.linescore.currentPeriodTimeRemaining.split(':');
    var time = (1200 - (_.toInteger(res[0]) * 60 + _.toInteger(res[1]))) / 1200;
    result.percentage = ((result.linescore.currentPeriod - 1) * 0.34 + time * 0.34) * 100;
  }
  result.teams.home.skaters = Object.values(result.teams.home.players)
    .filter((player) => { return player.position.code !== 'G' && player.position.code !== 'N/A' && player.stats.skaterStats !== null; })
    .map((player) => { return Object.assign(player, { stats: player.stats.skaterStats }) });
  result.teams.home.goalies = Object.values(result.teams.home.players)
    .filter((player) => { return player.position.code === 'G' && player.position.code !== 'N/A' && player.stats !== null; })
    .map((player) => { return Object.assign(player, { stats: player.stats.goalieStats }) });
  result.teams.away.skaters = Object.values(result.teams.away.players)
    .filter((player) => { return player.position.code !== 'G' && player.position.code !== 'N/A' && player.stats.skaterStats !== null; })
    .map((player) => { return Object.assign(player, { stats: player.stats.skaterStats }) });
  result.teams.away.goalies = Object.values(result.teams.away.players)
    .filter((player) => { return player.position.code === 'G' && player.position.code !== 'N/A' && player.stats !== null; })
    .map((player) => { return Object.assign(player, { stats: player.stats.goalieStats }) });
  return result;
}

async function getTodaysGames() {
  var games = (await db.getCollection('games').find({
    'date': DateTime.now().toISODate()
  }).toArray()).sort((a, b) => { return new Date(a.gameDate) - new Date(b.gameDate); });
  return games.map(async (game) => {
    var result = await apicomm.nhlApiRequest(`/api/v1/game/${game.gamePk}/linescore`);
    result.gameTime = DateTime.fromJSDate(game.gameDate).toFormat('HH:mm');
    result.gamePk = game.gamePk;
    result.ongoingGame = !_.isNil(result.currentPeriodTimeRemaining);
    result.finished = result.ongoingGame && result.currentPeriodTimeRemaining === 'Final';
    return result;
  });
}

module.exports = {
  init,
  getGame,
  getTodaysGames,
  gamesBetweenTeams,
};