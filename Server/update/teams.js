const db = require('../keys/db.json');
// Replace the uri string with your MongoDB deployment's connection string.
const dbhandler = require('../comm/dbhandler.js');
const { fetchTeams } = require("./functions");

async function run() {

  var db = new dbhandler.Database();
  await db.init();

  var teams = await fetchTeams()
  try {

    const collection = db.getCollection("teams");

    for (let team of teams) {
      const options = { upsert: true };
      const filter = { id: team.id };

      const updateDoc = {
        $set: {
          name: team.name,
          active: team.active,
          abbreviation: team.abbreviation,
          locationName: team.locationName,
          firstYearOfPlay: parseInt(team.firstYearOfPlay),
          franchiseId: team.franchiseId,
          division: team.division,
          conference: team.conference,
          venue: team.venue,
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

    const teamPlayerCollection = db.getCollection("players");

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
    await db.closeClient()
  }
}

run().catch(console.dir);