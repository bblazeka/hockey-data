const { MongoClient } = require("mongodb");
const db = require('./db.json');
// Replace the uri string with your MongoDB deployment's connection string.
const apicomm = require('./comm/apihandler');

const client = new MongoClient(db.uri);

async function fetchTeams() {
  const teams = []
  for (i = 1; i < 56; i++) {
    try {
      await apicomm.nhlApiRequest(`/api/v1/teams/${i}?expand=team.roster`).then(function (res) {
        teams.push(res.teams[0]);
      })
    }
    catch (ex) {
      console.log(ex);
    }
  }

  return new Promise((resolve, reject) => {
    resolve(teams);
  });
}

async function run() {

  var teams = []


  var x = await fetchTeams().then((res) => teams = res)

  try {

    await client.connect();

    const database = client.db("hockey-data", { useUnifiedTopology: true });
    const collection = database.collection("teams");

    for (let team of teams) {
      const options = { upsert: true };
      const filter = { id: team.id };


      const updateDoc = {
        $set: {
          name: team.name,
          abbreviation: team.abbreviation
        },
      };
      try {
        const queryResult = await collection.updateOne(filter, updateDoc, options);
        console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${team.name}`);
      } catch (ex) {
        console.log(ex)
      }
    }

  } finally {
    await client.close();
  }




}

run().catch(console.dir);