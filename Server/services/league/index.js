const { Database } = require("../../comm/dbhandler");
const apicomm = require('../../comm/apihandler');

var db = new Database();

function init(database) {
  db = database;
}

async function getStandings({season}){
  var records = await apicomm.nhlApiRequest(`/api/v1/standings?season=${season}`);
  return records.records;
}


async function getSchedule({start, end}) {
  var teams = await (await db.getCollection('teams').find({ "active": true }).toArray()).sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 );
  await db.getCollection('games').find({
    "gameDate": {
      $gt: new Date(`${start} 00:00:00`),
      $lt: new Date( `${end} 00:00:00`)
    }
  }).toArray().then(games => {
    for (let team of teams) {
      team.games = JSON.parse(JSON.stringify(games)).filter(g => g.home.team.id === team.id || g.away.team.id === team.id).map(el => {
        el.opponent = (el.home.team.id === team.id) ? el.away : el.home;
        return el;
      });
    }
  })
  return teams;
}


async function gamesBetweenTeams({homeId, awayId}) {
  const items = await db.getCollection('games').find({ "home.team.id": homeId, "away.team.id": awayId }).toArray();
  return items;
}


async function getProfiles() {
  const items = await db.getCollection('profiles').find({}).toArray();
  return items;
}

async function getGame({gameId}) {
  const linescore = await apicomm.nhlApiRequest(`/api/v1/game/${gameId}/linescore`);
  var result = await apicomm.nhlApiRequest(`/api/v1/game/${gameId}/boxscore`);
  result.id = gameId;
  result.linescore = linescore;
  result.teams.home.skaters = Object.values(result.teams.home.players).filter((player) => { return player.position.code !== 'G' && player.position.code !== 'N/A' && player.stats.skaterStats !== null })
  result.teams.home.goalies = Object.values(result.teams.home.players).filter((player) => { return player.position.code === 'G' && player.position.code !== 'N/A' && player.stats !== null })
  result.teams.away.skaters = Object.values(result.teams.away.players).filter((player) => { return player.position.code !== 'G' && player.position.code !== 'N/A' && player.stats.skaterStats !== null })
  result.teams.away.goalies = Object.values(result.teams.away.players).filter((player) => { return player.position.code === 'G' && player.position.code !== 'N/A' && player.stats !== null })
  return result;
}

module.exports = {
  init,
  gamesBetweenTeams,
  getProfiles,
  getSchedule,
  getStandings,
  getGame,
}