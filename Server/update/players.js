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

  await client.connect();

  try {

    const database = client.db("hockey-data", { useUnifiedTopology: true });
    
  var players = await dbhandler.getPlayers();

    const playerCollection = database.collection("players");
  
    for (let playerTemp of players) {
      var response = await apicomm.nhlApiRequest(`/api/v1/people/${playerTemp.id}`);
      var player = response.people[0]

      const options = { upsert: true };
      const filter = { id: player.id };
  
      const updateDoc = {
        $set: {
          fullName: player.fullName,
          firstName: player.firstName,
          lastName: player.lastName,
          primaryNumber: parseInt(player.primaryNumber),
          birthDate: player.birthDate,
          positon: player.position,
          height: Math.ceil(parseInt(player.height.split(" ")[0].replace(/\D/g, '')) / 3.2808 * 100 + parseInt(player.height.split(" ")[1].replace(/\D/g, '')) / 0.39370),
          weight: Math.floor(player.weight * 0.45359237),
          birthCity: player.birthStateProvince != undefined ? `${player.birthCity}, ${player.birthStateProvince}, ${player.birthCountry}` : `${player.birthCity}, ${player.birthCountry}`,
          nationality: player.nationality,
          active: player.active,
          alternateCaptain: player.alternateCaptain,
          captain: player.captain,
          rookie: player.rookie,
          shootsCatches: player.shootsCatches,
          rosterStatus: player.rosterStatus,
          currentTeam: player.currentTeam,
          primaryPosition: player.primaryPosition,
          lastUpdate: new Date()
        },
      };
      try {
        const queryResult = await playerCollection.updateOne(filter, updateDoc, options);
        console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${player.fullName}`);
      } catch (ex) {
        console.log(ex)
      }
    }

  } finally {
    await client.close();
  }
}

run().catch(console.dir);