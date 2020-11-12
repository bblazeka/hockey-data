const { MongoClient } = require("mongodb");
const db = require('../db.json');

const client = new MongoClient(db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
});

async function getTeam(teamId) {
  try {

    await client.connect();

    const database = client.db("hockey-data");
    const collection = database.collection("teams");
    const query = { id: teamId };
    const options = {
      projection: { _id: 0, id: 1, name: 1, abbreviation: 0 },
    };
    collection.findOne(query, options).then(team => {
      console.log(team)
    });

    /*return new Promise((resolve, reject) => {
      resolve(team);
    });*/
  } finally {
    await client.close();
  }
}

async function getPlayers() {
  const client = await MongoClient.connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // specify the DB's name
  const database = client.db('hockey-data');
  // execute find query
  const items = await database.collection('players').find({}).toArray();
  // close connection
  client.close();
  return items
}

module.exports = {
  getTeam,
  getPlayers
}