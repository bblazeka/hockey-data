const { Database } = require("../../comm/dbhandler");
const apicomm = require('../../comm/apihandler');

var db = new Database();

function init(database) {
  db = database;
}

async function getPlayer({id}) {
  const query = { id };
  const options = {
    sort: { id: -1 },
    projection: { _id: 0, id: 1, fullName: 1, jerseyNumber: 1, birthCity: 1, birthDate: 1, nationality: 1, currentTeam: 1, primaryPosition: 1 },
  };
  const player = await db.getCollection('players').findOne(query, options);

  var result = await apicomm.nhlApiRequest(`/api/v1/people/${id}/stats?stats=yearByYear`)
  player.nhlStats = result.stats[0].splits.filter(el => el.league.id === 133);
  player.careerStats = result.stats[0].splits;
  player.description = (await apicomm.wikiApiRequest(player.fullName)).extract;
  return player;
}

async function getPlayerByName({name}) {
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

async function addSelectedPlayer({id}) {
  var myquery = { userId: 0 };
  var newvalues = { $addToSet: { selectedPlayers: parseInt(id) } };
  db.getCollection('profiles').updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log(`${res.result.nModified} selected players added`);
  });

  var selectedPlayers = await getSelectedPlayers();
  return selectedPlayers;
}

async function deleteSelectedPlayer({id}) {
  var myquery = { userId: 0 };
  var newvalues = { $pull: { selectedPlayers: parseInt(id) } };
  db.getCollection('profiles').updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log(`${res.result.nModified} selected players deleted`);
  });

  var selectedPlayers = await getSelectedPlayers();
  return selectedPlayers;
}

async function getSelectedPlayers() {
  var profiles = await getProfiles();
  var skaters = [];
  var goalies = [];
  for(playerId of profiles[0].selectedPlayers)
  {
    var player = await apicomm.nhlApiRequest(`/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=20192020`);
    player.player = await getPlayer({id: playerId});
    if (player.player.primaryPosition.code !== "G")
    {
      skaters.push(player)
    }
    else
    {
      goalies.push(player)
    }
  }
  return {
    "skaters": skaters,
    "goalies": goalies,
  };
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
}