var _ = require('lodash');

const apicomm = require('../comm/apihandler');
const dbhandler = require('../comm/dbhandler.js');
const { fetchTeams } = require('./functions');

async function run() {

  var db = new dbhandler.Database();
  await db.init();

  var teams = await fetchTeams();
  try {

    const collection = db.getCollection('teams');

    for (let team of teams) {
      var location = await apicomm.mapboxApiRequest(_.isNil(team.venue) ? team.locationName : `${team.venue.name} ${team.venue.city}`);

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
          location: location.features.map(el => {
            return ({
              text: el.text,
              placeName: el.place_name,
              center: el.center,
            });
          })[0],
          lastUpdate: new Date()
        },
      };
      try {
        const queryResult = await collection.updateOne(filter, updateDoc, options);
        console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${team.name}`);
      } catch (ex) {
        console.log(ex);
      }
    }

    const teamPlayerCollection = db.getCollection('players');

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
          console.log(ex);
        }
      }

    }

  } finally {
    await db.closeClient();
  }
}

run().catch(console.dir);