const { isNil } = require("lodash");

const apicomm = require("./adapters/apihandler");
const dbhandler = require("./adapters/dbhandler.js");
const { fetchTeams } = require("./functions");

async function run() {
  const db = new dbhandler.Database();
  await db.init();

  const teams = await fetchTeams();
  try {
    const collection = db.getCollection("teams");
    for (let team of teams) {
      const location = await apicomm.mapboxApiRequest(
        isNil(team.venue)
          ? team.locationName
          : `${team.venue.name} ${team.venue.city}`
      );

      const options = { upsert: true };
      const filter = { id: team.id };

      const updateDoc = {
        $set: {
          name: team.name,
          active: team.active,
          abbreviation: team.abbreviation,
          locationName: team.locationName,
          description: (await apicomm.wikiApiRequest(team.name)).extract,
          firstYearOfPlay: parseInt(team.firstYearOfPlay),
          franchiseId: team.franchiseId,
          division: team.division,
          conference: team.conference,
          venue: team.venue ? {...team.venue, description: (
            await apicomm.wikiApiAdvancedRequest(team.venue.name, team.venue.city)
          ).extract }: undefined,
          location: location.features.map((el) => {
            return {
              text: el.text,
              placeName: el.place_name,
              center: el.center,
            };
          })[0],
          lastUpdate: new Date(),
        },
      };
      try {
        const queryResult = await collection.updateOne(
          filter,
          updateDoc,
          options
        );
        console.log(
          `${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${team.name}`
        );
      } catch (ex) {
        console.log(ex);
      }
    }

    const teamPlayerCollection = db.getCollection("players");

    for (let team of teams) {
      if (team.roster == undefined) {
        continue;
      }
      const roster = team.roster.roster;
      for (let player of roster) {
        const options = { upsert: true };
        const filter = { id: player.person.id };

        const updateDoc = {
          $set: {
            fullName: player.person.fullName,
            jerseyNumber: parseInt(player.jerseyNumber),
            positon: player.position,
            active: true,
          },
        };
        try {
          const queryResult = await teamPlayerCollection.updateOne(
            filter,
            updateDoc,
            options
          );
          console.log(
            `${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${player.person.fullName}`
          );
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
