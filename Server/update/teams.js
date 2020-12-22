const { MongoClient } = require("mongodb");
const db = require('../keys/db.json');
// Replace the uri string with your MongoDB deployment's connection string.
const apicomm = require('../comm/apihandler');
const functions = require('./functions');
const dbhandler = require('../comm/dbhandler.js');
const { fetchTeams } = require("./functions");

const client = new MongoClient(db.uri);

async function run() {

  await dbhandler.init();

  var teams = []

  await client.connect();

  var x = await fetchTeams().then((res) => teams = res)

  try {

    const database = client.db("hockey-data", { useUnifiedTopology: true });
    const collection = database.collection("teams");

    for (let team of teams) {
      const options = { upsert: true };
      const filter = { id: team.id };


      const updateDoc = {
        $set: {
          name: team.name,
          active: team.active,
          abbreviation: team.abbreviation,
          lastUpdate: new Date()
        },
      };
      try {
        const queryResult = await collection.updateOne(filter, updateDoc, options);
        console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${team.name}`);
      } catch (ex) {
        console.log(ex)
      }
    }

    const teamPlayerCollection = database.collection("players");

    for (let team of teams) {
      if (team.roster == undefined)
      {
        continue;
      }
      var roster = team.roster.roster;
      for (let player of roster) {
        const options = { upsert: true };
        const filter = { id: player.person.id };


        const updateDoc = {
          $set: {
            fullName: player.person.fullName,
            jerseyNumber: parseInt(player.jerseyNumber),
            positon: player.position
          },
        };
        try {
          const queryResult = await teamPlayerCollection.updateOne(filter, updateDoc, options);
          console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${player.person.fullName}`);
        } catch (ex) {
          console.log(ex)
        }
      }

    }

  } finally {
    await client.close();
  }
}

run().catch(console.dir);