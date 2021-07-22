var _ = require('lodash');

const { Database } = require('../../comm/dbhandler');
const apicomm = require('../../comm/apihandler');
const config = require('../../config.json');

var db = new Database();

function init(database) {
  db = database;
}

function getGroup(array) {
  const sumObjectsByKey = (...objs) => {
    const res = objs.reduce((a, b) => {
       for (let k in b) {
          if (b.hasOwnProperty(k))
          a[k] = (a[k] || 0) + b[k];
       }
       return a;
    }, {});
    return res;
 }

  var result = [];
  array.reduce(function (res, value) {
    var key = `${value.season.substr(2, 2)}/${value.season.slice(-2)}`;
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
  const options = {
    sort: { id: -1 },
  };
  const player = await db.getCollection('players').findOne(query, options);

  var result = await apicomm.nhlApiRequest(`/api/v1/people/${id}/stats?stats=yearByYear`);
  var nhlStatsOnly = result.stats[0].splits.filter(el => el.league.id === 133);
  player.nhlStats = {
    totalGames: nhlStatsOnly.reduce((accum, item) => accum + item.stat.games, 0),
    totalGamesStarted: nhlStatsOnly.reduce((accum, item) => accum + item.stat.gamesStarted, 0),
    totalWins: nhlStatsOnly.reduce((accum, item) => accum + item.stat.wins, 0),
    totalGoals: nhlStatsOnly.reduce((accum, item) => accum + item.stat.goals, 0),
    totalAssists: nhlStatsOnly.reduce((accum, item) => accum + item.stat.assists, 0),
    totalPoints: nhlStatsOnly.reduce((accum, item) => accum + item.stat.points, 0),
    seasonSums: getGroup(nhlStatsOnly),
    stats: nhlStatsOnly
  };
  player.careerStats = { stats: result.stats[0].splits };
  player.description = (await apicomm.playerWikiRequest(player.fullName, `(ice hockey, born ${player.birthDate.split('-')[0]})`)).extract;
  return player;
}

async function getPlayerByName({ name }) {
  const query = { fullName: new RegExp(name, 'i') };
  const players = await db.getCollection('players').find(query).toArray();
  return players;
}

async function getPlayersFromTeam(teamId) {
  const items = await db.getCollection('players').find({ 'currentTeam.id': parseInt(teamId) }).toArray();

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
  for (let playerId of profiles[0].selectedPlayers) {
    var playerStats = (await apicomm.nhlApiRequest(`/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${config.currentSeason}`)).stats[0].splits[0].stat;
    const query = { id: playerId };
    const options = {
      sort: { id: -1 },
    };
    var player = await db.getCollection('players').findOne(query, options);
    
    if (player.primaryPosition.code !== 'G') {
      player.stats = Object.assign(playerStats, {
        evenTimeOnIceMinutes: parseInt(playerStats.evenTimeOnIce.split(':')[0]),
        powerPlayTimeOnIceMinutes: parseInt(playerStats.powerPlayTimeOnIce.split(':')[0]),
        shortHandedTimeOnIceMinutes: parseInt(playerStats.shortHandedTimeOnIce.split(':')[0])
      });
      player.averageStats = {
        goals: _.round(playerStats.goals / playerStats.games, 2),
        assists: _.round(playerStats.assists / playerStats.games, 2),
        points: _.round(playerStats.points / playerStats.games, 2),
        shots: _.round(playerStats.shots / playerStats.games, 2),
        hits: _.round(playerStats.hits / playerStats.games, 2),
        blocked: _.round(playerStats.blocked / playerStats.games, 2),
        powerPlayGoals: _.round(playerStats.powerPlayGoals / playerStats.games, 2),
        powerPlayPoints: _.round(playerStats.powerPlayPoints / playerStats.games, 2),
        shortHandedGoals: _.round(playerStats.shortHandedGoals / playerStats.games, 2),
        shortHandedPoints: _.round(playerStats.shortHandedPoints / playerStats.games, 2),
        gameWinningGoals: _.round(playerStats.gameWinningGoals / playerStats.games, 2)
      }
      skaters.push(player);
    }
    else {
      player.stats = playerStats;
      goalies.push(player);
    }
  }
  return {
    'skaters': skaters,
    'goalies': goalies,
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
};