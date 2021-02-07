const { Database } = require("../../comm/dbhandler");
const apicomm = require('../../comm/apihandler');
const config = require('../../config.json');

var db = new Database();

function init(database) {
  db = database;
}

function getGroup(array, propertyName) {
  var result = [];
  array.reduce(function (res, value) {
    var key = `${value.season.substr(2, 2)}/${value.season.slice(-2)}`
    if (!res[key]) {
      res[key] = { x: key, y: 0 };
      result.push(res[key])
    }
    res[key].y += value.stat[propertyName];
    return res;
  }, {});
  return result;
}

async function getPlayer({ id }) {
  const query = { id };
  const options = {
    sort: { id: -1 },
    projection: { _id: 0, id: 1, fullName: 1, jerseyNumber: 1, birthCity: 1, birthDate: 1, nationality: 1, currentTeam: 1, primaryPosition: 1 },
  };
  const player = await db.getCollection('players').findOne(query, options);

  var result = await apicomm.nhlApiRequest(`/api/v1/people/${id}/stats?stats=yearByYear`)
  var nhlStatsOnly = result.stats[0].splits.filter(el => el.league.id === 133);
  player.nhlStats = {
    totalGames: nhlStatsOnly.reduce((accum, item) => accum + item.stat.games, 0),
    totalGamesStarted: nhlStatsOnly.reduce((accum, item) => accum + item.stat.gamesStarted, 0),
    totalWins: nhlStatsOnly.reduce((accum, item) => accum + item.stat.wins, 0),
    totalGoals: nhlStatsOnly.reduce((accum, item) => accum + item.stat.goals, 0),
    totalAssists: nhlStatsOnly.reduce((accum, item) => accum + item.stat.assists, 0),
    totalPoints: nhlStatsOnly.reduce((accum, item) => accum + item.stat.points, 0),
    goalsLine: getGroup(nhlStatsOnly, 'goals'),
    assistsLine: getGroup(nhlStatsOnly, 'assists'),
    gamesStartedLine: getGroup(nhlStatsOnly, 'gamesStarted'),
    winsLine: getGroup(nhlStatsOnly, 'wins'),
    stats: nhlStatsOnly
  };
  player.careerStats = { stats: result.stats[0].splits };
  player.description = (await apicomm.wikiApiRequest(player.fullName)).extract;
  return player;
}

async function getPlayerByName({ name }) {
  const query = { fullName: new RegExp(name, "i") };
  const players = await db.getCollection("players").find(query).toArray();
  return players;
}

async function getPlayersFromTeam(teamId) {
  const items = await db.getCollection('players').find({ "currentTeam.id": parseInt(teamId) }).toArray();

  return items;
}

async function getPlayers() {
  const items = await db.getCollection('players').find({}).toArray();

  return items;
}

async function addSelectedPlayer({ id }) {
  var myquery = { userId: 0 };
  var newvalues = { $addToSet: { selectedPlayers: parseInt(id) } };
  var res = await db.getCollection('profiles').updateOne(myquery, newvalues);
  console.log(`${res.result.nModified} selected players added`);

  var selectedPlayers = await getSelectedPlayers();
  return selectedPlayers;
}

async function deleteSelectedPlayer({ id }) {
  var myquery = { userId: 0 };
  var newvalues = { $pull: { selectedPlayers: parseInt(id) } };
  var res = await db.getCollection('profiles').updateOne(myquery, newvalues);
  console.log(`${res.result.nModified} selected players deleted`);

  var selectedPlayers = await getSelectedPlayers();
  return selectedPlayers;
}

async function getSelectedPlayers() {
  var profiles = await getProfiles();
  var skaters = [];
  var goalies = [];
  for (playerId of profiles[0].selectedPlayers) {
    var player = await apicomm.nhlApiRequest(`/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${config.currentSeason}`);
    player.player = await getPlayer({ id: playerId });
    if (player.player.primaryPosition.code !== "G") {
      skaters.push(player)
    }
    else {
      goalies.push(player)
    }
  }
  return {
    "skaters": skaters,
    "goalies": goalies,
  };
}

async function clearSelectedPlayers() {
  var myquery = { userId: 0 };
  var newvalues = { $set: { selectedPlayers: [] } };
  var res = await db.getCollection('profiles').updateOne(myquery, newvalues);
  console.log(`${res.result.nModified} selected players deleted`);

  var selectedPlayers = await getSelectedPlayers();
  return selectedPlayers;
}

async function getProfiles() {
  const items = await db.getCollection('profiles').find({}).toArray();
  return items;
}

module.exports = {
  init,
  getPlayer,
  getPlayers,
  getPlayersFromTeam,
  getPlayerByName,
  getSelectedPlayers,
  addSelectedPlayer,
  deleteSelectedPlayer,
  clearSelectedPlayers,
}