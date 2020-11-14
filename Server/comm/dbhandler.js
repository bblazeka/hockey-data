const { MongoClient } = require("mongodb");
const db = require('../db.json');

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

async function getTeam(teamId) {
  const database = client.db("hockey-data");
  const collection = database.collection("teams");
  const query = { id: teamId };
  const options = {
    sort: { id: -1 },
    projection: { _id: 0, id: 1, name: 1, abbreviation: 1 },
  };
  const team = await collection.findOne(query, options);

  team.rosterResponse = await getPlayersFromTeam(teamId);

  return team
}

async function getPlayer(playerId) {
  const database = client.db("hockey-data");
  const collection = database.collection("players");
  const query = { id: parseInt(playerId) };
  const options = {
    sort: { id: -1 },
    projection: { _id: 0, id: 1, fullName: 1, jerseyNumber: 1, birthCity: 1, birthDate: 1, nationality: 1 },
  };
  const player = await collection.findOne(query, options);

  return player
}

async function getPlayersFromTeam(teamId) {
  const database = client.db('hockey-data');
  const items = await database.collection('players').find({ "currentTeam.id": parseInt(teamId) }).toArray();

  return items
}

async function getPlayers() {
  const database = client.db('hockey-data');
  const items = await database.collection('players').find({}).toArray();

  return items
}

module.exports = {
  init,
  getTeam,
  getPlayer,
  getPlayers
}