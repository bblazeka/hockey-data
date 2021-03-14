const { Database } = require("../../comm/dbhandler");
const apicomm = require('../../comm/apihandler');
const common = require('common');
const { DateTime } = require('luxon');

var db = new Database();

function init(database) {
  db = database;
}

function calculateGameScore(opponent)
{
  var totalGames = opponent.leagueRecord.wins + opponent.leagueRecord.ot + opponent.leagueRecord.losses;
  return (opponent.leagueRecord.wins*2 + opponent.leagueRecord.ot) / (2*totalGames);
}

async function getStandings({ season }) {
  var records = await apicomm.nhlApiRequest(`/api/v1/standings?season=${season}`);
  return records.records;
}

async function getSchedule({ start, end }) {
  var teams = await (await db.getCollection('teams').find({ "active": true }).toArray()).sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);
  var games = await db.getCollection('games').find({
    "date": {
      $gte: `${start}`,
      $lte: `${end}`
    }
  }).toArray();
  for (let team of teams) {
    team.scheduleScore = 0;
    team.games = JSON.parse(JSON.stringify(games)).filter(g => g.home.team.id === team.id || g.away.team.id === team.id).map(el => {
      el.opponent = (el.home.team.id === team.id) ? el.away : el.home;
      var score = calculateGameScore(el.opponent);
      el.opponent.rating = Math.round((score + Number.EPSILON) * 100) / 100;
      team.scheduleScore += score;
      return el;
    });
    team.scheduleScore = Math.round((team.scheduleScore + Number.EPSILON) * 100) / 100;
    team.avgScheduleScore = Math.round((team.scheduleScore / team.games.length + Number.EPSILON) * 100) / 100;
  }
  return teams;
}

async function gamesBetweenTeams({ homeId, awayId }) {
  const items = await db.getCollection('games').find({ "home.team.id": homeId, "away.team.id": awayId }).toArray();
  return items;
}

async function getGame({ gameId }) {
  const linescore = await apicomm.nhlApiRequest(`/api/v1/game/${gameId}/linescore`);
  var result = await apicomm.nhlApiRequest(`/api/v1/game/${gameId}/boxscore`);
  var dbGame = (await db.getCollection('games').find({ "gamePk": gameId }).toArray())[0];
  result.gameDate = dbGame.gameDate;
  result.season = dbGame.season;
  result.id = gameId;
  result.linescore = linescore;
  result.venue = dbGame.venue;
  result.teams.home.skaters = Object.values(result.teams.home.players).filter((player) => { return player.position.code !== 'G' && player.position.code !== 'N/A' && player.stats.skaterStats !== null })
  result.teams.home.goalies = Object.values(result.teams.home.players).filter((player) => { return player.position.code === 'G' && player.position.code !== 'N/A' && player.stats !== null })
  result.teams.away.skaters = Object.values(result.teams.away.players).filter((player) => { return player.position.code !== 'G' && player.position.code !== 'N/A' && player.stats.skaterStats !== null })
  result.teams.away.goalies = Object.values(result.teams.away.players).filter((player) => { return player.position.code === 'G' && player.position.code !== 'N/A' && player.stats !== null })
  return result;
}

async function getTodaysGames() {
  var games = (await db.getCollection('games').find({
    "date": common.DateToServerFormat(new Date())
  }).toArray()).sort((a, b) => (a.gameDate > b.gameDate) ? 1 : (a.gameDate < b.gameDate) ? -1 : 0);
  return games.map(async (game) => {
    var result = await apicomm.nhlApiRequest(`/api/v1/game/${game.gamePk}/linescore`);
    result.gameTime = DateTime.fromJSDate(game.gameDate).toFormat("HH:mm");
    result.gamePk = game.gamePk;
    return result;
  });
}

module.exports = {
  init,
  gamesBetweenTeams,
  getSchedule,
  getStandings,
  getGame,
  getTodaysGames,
}