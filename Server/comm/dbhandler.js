const { MongoClient } = require("mongodb");
const db = require('../keys/db.json');

var client = new MongoClient(db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
});

async function init() {
  client = await MongoClient.connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function getSchedule(start, end)
{
  const database = client.db('hockey-data');
  const items = await database.collection('games').find({"gameDate" : { $gt : new Date(start),
    $lt : new Date(end)
  }}).toArray();
  return items;
}

async function getTeams()
{
  const database = client.db('hockey-data');
  const items = await database.collection('teams').find({}).toArray();
  return items;
}

async function getTeam(teamId) {
  const database = client.db("hockey-data");
  const collection = database.collection("teams");
  const query = { id: teamId };
  const options = {
    sort: { id: -1 },
    projection: { _id: 0, id: 1, name: 1, abbreviation: 1 },
  };
  const team = await collection.findOne(query, options);

  if (team != null)
  {
    team.rosterResponse = await getPlayersFromTeam(teamId);
  }

  return team;
}

async function getPlayer(playerId) {
  const database = client.db("hockey-data");
  const collection = database.collection("players");
  const query = { id: parseInt(playerId) };
  const options = {
    sort: { id: -1 },
    projection: { _id: 0, id: 1, fullName: 1, jerseyNumber: 1, birthCity: 1, birthDate: 1, nationality: 1, currentTeam: 1, primaryPosition: 1 },
  };
  const player = await collection.findOne(query, options);

  return player;
}

async function getPlayerByName(name) {
  const database = client.db("hockey-data");
  const collection = database.collection("players");
  const query = { fullName: new RegExp(name, "i") };
  const players = await collection.find(query).toArray();
  return players;
}

async function getPlayersFromTeam(teamId) {
  const database = client.db('hockey-data');
  const items = await database.collection('players').find({ "currentTeam.id": parseInt(teamId) }).toArray();

  return items;
}

async function getPlayers() {
  const database = client.db('hockey-data');
  const items = await database.collection('players').find({}).toArray();

  return items;
}

module.exports = {
  init,
  getTeam,
  getTeams,
  getPlayer,
  getPlayers,
  getPlayerByName,
  getSchedule,
}